
import Button from '../gameObjects/button.js'

// Variable que contiene el estado del juego
let gameState = {time: 1, win: false}

function randomArr() {
    var initArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var temArr = []
    while (initArr.length > 0) {
        temArr.push(initArr.splice(Math.floor(Math.random() * initArr.length), 1)[0]);
    }
    return temArr;
}

class Scene_rompecabezas extends Phaser.Scene {

    constructor() {
        super({ key: "Scene_rompecabezas" });
    }
    
    init(){
        this.temPosition = {};
        this.jindu;
        this.sort = randomArr()  
        this.puzzleGroup
        //Variables del tiempo
        this.time = 20;
        this.timeElapsed = 0;
        this.maxTime = 1;
        //Piezas rompecabeza
        this.tamaSprite = 184/2;
        this.posX = 560
        this.posY = 285  
    }

    create() {
        this.resetGameState();
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        
        this.game.sound.stopAll();

        this.sound.add('M_puzzle', {loop:true, volume: 0.3}).play();

        this.background = this.add.image(center_width, center_height , 'bg-rompecabezas');

        //Texto con informacion sobre los dientes
        //this.add.text(center_width-250, center_height-50, 'Un tercio de tus \ndientes está por \ndebajo de la encía.', style);


        const buttonMenu = new Button( this, center_width-100, center_height+120, "Regresar").setScale(0.6);
        this.add.existing(buttonMenu);
        buttonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
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
        
        this.puzzleGroup = this.add.group();
        let item;
        
        let numPuzzle = Math.floor(Math.random() * ((4) - (1) + 1) + 1)
       
        for (var i in this.sort) {
            item = this.puzzleGroup.create(this.posX +  this.tamaSprite * (Math.floor(i % 3)),   this.posY + this.tamaSprite * (Math.floor(i / 3)), 'puzzle-'+numPuzzle.toString(), this.sort[i]);
            item.sort = this.sort[i];
            item.nowSort = +i;
            item.setInteractive();
            this.input.setDraggable(item);
            this.input.dragDistanceThreshold = 16;
            this.input.topOnly = false;

            item.on('dragstart', function(pointer, dragX, dragY){
                this.setDepth(1);
                this.setTint(0xCCCCCC);
                
                this.scene.temPosition.x = this.x;
                this.scene.temPosition.y = this.y;
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
                
                Phaser.Actions.Call(this.scene.puzzleGroup.getChildren(), function(item) {
                    if(item.nowSort === newSort){
                        var t = this;
                        item.setDepth(1);
                        this.scene.tweens.add({
                            targets: item,
                            onComplete: function(){
                                item.setDepth(0);
                                
                                item.nowSort = t.nowSort
                                t.nowSort = newSort;
                                if(this.parent.scene.checkSort()){
                                    gameState.time = t.scene.time;
                                    gameState.win = true;
                                    this.parent.scene.saveGameState();
                                    
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

        
        this.puzzleGroup.children.iterate((child) => {
        child.setScale(0.5);
        });
        
    }

    checkSort(){
        var ifFinash = true;
        this.puzzleGroup.getChildren().forEach(function(item) {
            if(item.sort !== item.nowSort){
                ifFinash = false;
            }
          }, this);
        return ifFinash;
    }
    /**
     * función resetGameState
     *  limpia el estado actual del juego y lo inicializa
     */
     resetGameState() {
        window.localStorage.clear();
        gameState = {time: true, win: false};
    }
    /**
     * función saveGameState
     *  guarda el estado actual del juego
     */
     saveGameState() {
        window.localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    update(time, delta) {

        let deltaInSecond = delta/1000; 
        this.timeElapsed = this.timeElapsed + deltaInSecond;
         if(this.timeElapsed >= this.maxTime)
        {
            this.time--;
            this.timeText.setText("Tiempo: " + this.time.toString()+ " seg.");
            this.timeElapsed = 0; 
            if(gameState.win || this.time <= 0){
                this.saveGameState();
                this.scene.start("Scene_play_final")
            }
        }
            
    }

}

export default Scene_rompecabezas;