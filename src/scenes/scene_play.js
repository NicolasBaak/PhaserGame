
import Button from '../gameObjects/button.js'
import Puzzle from '../gameObjects/Puzzle.js';
var time = 50;
var jinduWord;

var jindu;
var sort = randomArr()
var temPosition = {};
var pintuGroup
var allowDragStart = true;
var allowDragStop = false;

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

    preload() {
        this.load.spritesheet("pintu", "./src/assets/images/pintu.png", { frameWidth: 184, frameHeight: 184 });
        this.load.image("jindu", "./src/assets/images/jindu.png");
        this.load.image("jinduBg", "./src/assets/images/jinduBg.png");
    }

    create() {
        var style = { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '24px' };
        this.game.sound.stopAll();
        this.sound.add('M_puzzle', {loop:true, volume: 0.3}).play();
   
        //Variables
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        //Establece rectangulo donde se dibujara la imagen
        this.add.rectangle(center_width+200, center_height+100, 800, 700, 0xd689b3);

        // Titulo del juego
        this.titulo = this.add.image(230, 60, "titulo-romp");
        this.titulo.setScale(0.5);
        this.titulo.setAngle(-5);

        //texto con informacion sobre los dientes
        this.add.text(50, center_height, 'Un tercio de tus \ndientes está por \ndebajo de la encía.',style);

        //this.add.image(center_width, center_height+70, 'dientes').setTint(0x9FC5E8);

        const buttonMenu = new Button( this, 120, center_height*2-40, 'button-menu', 'button-menu-hover').setScale(0.45);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);

        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Menu');
         })

        ///=========Puzzle====
        var container = this.add.container(530, 145);
        var jinduBg = this.add.sprite(center_width+250, 70, 'jinduBg')
        jindu = this.add.sprite(center_width+250, 70, 'jindu')

        // jinduBg.addChild(jindu)

        jindu.scaleX = 1.4;
        var tween = this.tweens.add({
            targets: jindu,
            props: {
                scaleX: { value: 0, duration: 15 * 1000, ease: 'None', repeat: 0 }
            }
        });

        this.leftTime = time
      
        jinduWord = this.add.text(center_width+180, 20, "Tiempo: " + this.leftTime + " s", style);

        pintuGroup = this.add.group();
        // Phaser.Actions.SetXY(pintuGroup.getChildren(), 48, 500, 64, 0);

        var item;
        for (var i in sort) {
            item = pintuGroup.create(center_width-10 + 184 * (Math.floor(i % 3)), center_height+60-184 + 184 * (Math.floor(i / 3)), 'pintu', sort[i]);
            item.sort = sort[i];
            item.nowSort = +i;
            item.setInteractive();
            this.input.setDraggable(item);
            this.input.dragDistanceThreshold = 16;

            this.input.on('dragstart', function (pointer, gameObject) {
                gameObject.setDepth(1);
                // if (allowDragStart) {
                //     allowDragStart = false;
                //     allowDragStop = true;
               
                //     temPosition.x = gameObject.x;
                //     temPosition.y = gameObject.y;
                // } else {
                //     //gameObject.input.disableDrag();
                //     gameObject.input.draggable = false;
                // }
                gameObject.setTint(0xCCCCCC);
            }, this);

             this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                 gameObject.x = dragX;
                 gameObject.y = dragY;
             });

            this.input.on('dragend', function (pointer, gameObject) {
                gameObject.setDepth(0);
                gameObject.clearTint();
                // var t = this;
                // if (allowDragStop) {
                //     allowDragStop = false;

                //     if (temPosition.x === gameObject.x && temPosition.y === gameObject.y) {
                //         allowDragStart = true;
                //         allowDragStop = false;
                //         //pintuGroup.setAll('input.draggable', true)
                //         pintuGroup.input.draggable = true;
                //     } else {
                //         // 精灵移动到边界外返回原位置
                //         var temX = (gameObject.x - 25) / 184;
                //         var temY = (gameObject.y - 70) / 184;
                //         if (temX < 0 || temX > 2 || temY < 0 || temY > 2) {
                //             var temTween = this.tweens.timeline({
                //                 targets: gameObject,
                //                 props: {
                //                     x: { value: temPosition.x, duration: 300, ease: 'None', repeat: 0 },
                //                     y: { value: temPosition.y, duration: 300, ease: 'None', repeat: 0 }
                //                 },
                //                 onComplete: function(){
                //                     allowDragStart = true;
                //                     allowDragStop = false;
                //                     //pintuGroup.setAll('input.draggable', true)
                                    
                //                 }
                //             });
                //             return;
                //         }
                //         // 精灵移动到的位置排序
                //         var newSort = (gameObject.x - 25) / 184 + (gameObject.y - 70) / 184 * 3;

                //         // 循环group，使原拼图与新拼图替换位置
                //         var ifMoveEnd = true;
                //         pintuGroup.foreach(function (item) {
                //             if (item.nowSort === newSort && ifMoveEnd === true) {
                //                 ifMoveEnd = false;
                //                 //item.bringToTop()
                //                 item.setDepth(1);

                //                 // var tween = game.add.tween(item).to({ x: temPosition.x, y: temPosition.y }, 300, Phaser.Easing.Quartic.Out, true);

                //                 var tween = this.tweens.timeline({
                //                     targets: item,
                //                     props: {
                //                         x: { value: temPosition.x, duration: 300, ease: 'None', repeat: 0 },
                //                         y: { value: temPosition.y, duration: 300, ease: 'None', repeat: 0 }
                //                     },
                //                     onComplete: function(){
                //                         item.nowSort = sprite.nowSort
                //                         sprite.nowSort = newSort;
                //                         ifMoveEnd = true;
                //                         allowDragStart = true;
                //                         allowDragStop = false;
                //                        // pintuGroup.setAll('input.draggable', true)
                //                         if (t.checkSort()) {
                //                             window.alert("成功！");
                //                             this.paused = true;
                //                         }
                //                     }
                //                 });
                //             }
                //         })
                //     }
                // }
            }, this);
        }
    }

    update() {
    }

}

export default Scene_play;