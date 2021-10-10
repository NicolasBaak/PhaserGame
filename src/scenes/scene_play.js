
import Button from '../gameObjects/button.js'

function randomArr() {
    var initArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var temArr = []
    while (initArr.length > 0) {
        temArr.push(initArr.splice(Math.floor(Math.random() * initArr.length), 1)[0]);
    }
    return temArr;
}

class Scene_play extends Phaser.Scene {

    constructor() {
        super({ key: "Scene_play" });
        this.temPosition = {};
    }

    init(){
        this.jindu;
        this.sort = randomArr()
        
        this.pintuGroup
        //Variables del tiempo
        this.time = 50;
        this.timeElapsed = 0;
        this.maxTime = 1;
        this.tamaSprite = 184/2;
        this.posX = 560
        this.posY = 285  
    }

    create() {
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        var style = { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '24px' };
        this.game.sound.stopAll();

        //this.sound.add('M_puzzle', {loop:true, volume: 0.3}).play();
        this.background = this.add.image(center_width, center_height , 'bg-rompecabezas');

        //Texto con informacion sobre los dientes
        //this.add.text(center_width-250, center_height-50, 'Un tercio de tus \ndientes está por \ndebajo de la encía.', style);


        const buttonMenu = new Button( this, center_width-100, center_height+120, 'button-menu', 'button-menu-hover').setScale(0.6);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);
        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
           this.scene.start('Menu');
        })

        ///=========Puzzle====

        
        this.container = this.add.container(530, 145);
        this.jinduBg = this.add.sprite(center_width+150, 220, 'jinduBg').setScale(0.7)
        this.jindu = this.add.sprite(center_width+150, 220, 'jindu').setScale(0.8)

        //Tiempo
        this.timeText = this.add.bitmapText(center_width+50, 180, 'minecraft',`Tiempo: ${this.time} seg.`).setFontSize(28);
        var tween = this.tweens.add({
            targets: this.jindu,
            props: {
                scaleX: { value: 0, duration: this.time * 1000, ease: 'None', repeat: 0 }
            }
        });
        
        this.pintuGroup = this.add.group();
        let item;
        
        for (var i in this.sort) {
            item = this.pintuGroup.create(this.posX +  this.tamaSprite * (Math.floor(i % 3)),   this.posY + this.tamaSprite * (Math.floor(i / 3)), 'pintu', this.sort[i]);
            item.sort = this.sort[i];
            item.nowSort = +i;
            //console.log("principio", item.sort, item.nowSort)
            item.setInteractive();
            this.input.setDraggable(item);
            this.input.dragDistanceThreshold = 16;
            this.input.topOnly = false;

            item.on('dragstart', function(pointer, dragX, dragY){
                this.setDepth(1);
                this.setTint(0xCCCCCC);
                
                this.scene.temPosition.x = this.x;
                this.scene.temPosition.y = this.y;
                //console.log("start: ", this.scene.temPosition.x );
            });

             item.on('drag', function (pointer, dragX, dragY) {
                 this.x = Phaser.Math.Snap.To(dragX - this.scene.posX, this.scene.tamaSprite) + this.scene.posX;

                 this.y = Phaser.Math.Snap.To(dragY - this.scene.posY, this.scene.tamaSprite) + this.scene.posY; 
             });

             item.on('dragend', function(pointer, dragX, dragY){
                this.setDepth(0);
                this.clearTint();
                var temX = (this.x - this.scene.posX)/(this.scene.tamaSprite);
                var temY = (this.y - this.scene.posY)/(this.scene.tamaSprite);
                if(temX<0 || temX>2 || temY<0 || temY>2){
                    this.scene.tweens.add({
                        targets: this,
                        props: {
                            x: { value: this.scene.temPosition.x, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                            y: { value: this.scene.temPosition.y, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                        }
                    });
                    return;
                }

                var newSort = (this.x- this.scene.posX)/this.scene.tamaSprite + (this.y-this.scene.posY)/this.scene.tamaSprite*3;
                
                Phaser.Actions.Call(this.scene.pintuGroup.getChildren(), function(item) {
                    if(item.nowSort === newSort){
                        var t = this;
                        item.setDepth(1);
                        this.scene.tweens.add({
                            targets: item,
                            onComplete: function(){
                                //console.log(this, this.parent, t.nowSort)
                                item.setDepth(0);
                                
                                item.nowSort = t.nowSort
                                t.nowSort = newSort;
                                if(this.parent.scene.checkSort()){
                                    console.log("GANASTEEE!!!")
                                }
                            },
                            props: {
                                x: { value: this.scene.temPosition.x, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                                y: { value: this.scene.temPosition.y, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                            }
                        }, this);
                    }

                  }, this);

             });
        }

        
        this.pintuGroup.children.iterate((child) => {
        child.setScale(0.5);
        console.log("Mas peque")
        });
        
    }

    checkSort(){
        var ifFinash = true;
        this.pintuGroup.getChildren().forEach(function(item) {
            if(item.sort !== item.nowSort){
                ifFinash = false;
            }
          }, this);
        return ifFinash;
    }

    update(time, delta) {
        let deltaInSecond = delta/1000; 
        this.timeElapsed = this.timeElapsed + deltaInSecond;
         if(this.timeElapsed >= this.maxTime)
        {
            this.time--;
            this.timeText.setText("Tiempo: " + this.time.toString()+ " seg.");
            this.timeElapsed = 0; 
        }
            
    }

}

export default Scene_play;