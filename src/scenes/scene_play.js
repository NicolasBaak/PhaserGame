
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
    }

    init(){
        this.jindu;
        this.sort = randomArr()
        this.temPosition = {};
        this.pintuGroup
        //Variables del tiempo
        this.time = 50;
        this.timeElapsed = 0;
        this.maxTime = 1;
        this.tamaSprite = 184;
    }

    create() {
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        var style = { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '24px' };
        this.game.sound.stopAll();

        //this.sound.add('M_puzzle', {loop:true, volume: 0.3}).play();
        //this.background = this.add.image(center_width, center_height , 'bg-rompecabezas');

        //Texto con informacion sobre los dientes
        //this.add.text(center_width-250, center_height-50, 'Un tercio de tus \ndientes está por \ndebajo de la encía.', style);

/*
        const buttonMenu = new Button( this, center_width-100, center_height+120, 'button-menu', 'button-menu-hover').setScale(0.6);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);
        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
           this.scene.start('Menu');
        })
*/
        ///=========Puzzle====

        /*
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
        */
        this.pintuGroup = this.add.group();
        let item;
        let posX = 540   //560
        let posY = 150   //285  posiciones para ajustarse al background
        for (var i in this.sort) {
            item = this.pintuGroup.create(posX +  this.tamaSprite * (Math.floor(i % 3)),   posY + this.tamaSprite * (Math.floor(i / 3)), 'pintu', this.sort[i]);
            item.sort = this.sort[i];
            item.nowSort = +i;
            console.log("principio", item.sort, item.nowSort)
            item.setInteractive();
            this.input.setDraggable(item);
            this.input.dragDistanceThreshold = 16;
            this.input.topOnly = false;

            this.input.on('dragstart', function (pointer, gameObject) {
                gameObject.setDepth(1);
                gameObject.setTint(0xCCCCCC);
                this.temPosition.x = gameObject.x;
                this.temPosition.y = gameObject.y;
                console.log("partimos de: ", gameObject.x, gameObject.y)
            }, this);

             this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                 gameObject.x = Phaser.Math.Snap.To(dragX - posX, this.tamaSprite) + posX;
                 gameObject.y = Phaser.Math.Snap.To(dragY - posY, this.tamaSprite) + posY; 
             }, this);

            this.input.on('dragend', function (pointer, gameObject) {
                gameObject.setDepth(0);
                gameObject.clearTint();
                var temX = (gameObject.x - posX)/(this.tamaSprite);
                var temY = (gameObject.y - posY)/(this.tamaSprite);
                if(temX<0 || temX>2 || temY<0 || temY>2){
                    console.log("Se salio :>")
                    this.tweens.add({
                        targets: gameObject,
                        props: {
                            x: { value: this.temPosition.x, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                            y: { value: this.temPosition.y, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                        }
                    });
                    return;
                }
                var newSort = (gameObject.x-posX)/this.tamaSprite + (gameObject.y-posY)/this.tamaSprite*3;
                var ifMoveEnd = true;
                this.pintuGroup.getChildren().forEach(function(item){
                    if(item.nowSort === newSort && ifMoveEnd === true){
                        ifMoveEnd = false;
                        item.setDepth(1);
                        var temtween = this.tweens.add({
                            targets: item,
                            onComplete: ()=>{
                                item.nowSort = gameObject.nowSort
                                gameObject.nowSort = newSort;
                                ifMoveEnd = true;
                                console.log("movemos item:", item.sort, item.nowSort)
                                item.setDepth(0);
                                //this.checkSort();
                            },
                            props: {
                                x: { value: this.temPosition.x, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                                y: { value: this.temPosition.y, duration: 300, ease: 'Quartic.Out', repeat: 0 }, 
                            }
                        });
                       
                        
                        
                    }
                }, this);

                this.checkSort();
            }, this);
            
        }

        /*
        this.pintuGroup.children.iterate((child) => {
        child.setScale(0.5);
        console.log("Mas peque")
        });
        */
    }

    checkSort(){
        var ifFinash = true;
        console.log("Revizando ando...")
        this.pintuGroup.getChildren().forEach(function(item) {
            if(item.sort !== item.nowSort){
                ifFinash = false;
            }
          }, this);
        return ifFinash;
    }

    update(time, delta) {
        /*
        let deltaInSecond = delta/1000; // convert it to second
        this.timeElapsed = this.timeElapsed + deltaInSecond;
         if(this.timeElapsed >= this.maxTime) // if the time elapsed already more than 1 second, update the energy variable
        {
            this.time--;
            this.timeText.setText("Tiempo: " + this.time.toString()+ " seg.");
            this.timeElapsed = 0; // don't forget to reset it to zero again.
            }
            */
    }

}

export default Scene_play;