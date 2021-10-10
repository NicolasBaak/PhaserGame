import Button from '../gameObjects/button.js';
var bmd = [];
var block = [];
var card = [];
var stime = 0;
var times = 0;
var bpre;
var bcur;
var pre = -1;
var cur = -1;
var boolean = false;
var timing;

class Memoria extends Phaser.Scene{
    constructor(){
        super({key: 'Memoria'});
        var progressText;
    }
    preload(){
    }
    create(){
        this.game.sound.stopAll();
        this.sound.add('M_memorama', {loop:true, volume: 0.3}).play();

        let width = this.sys.game.config.width/4;
        let height = this.sys.game.config.height/4;
        console.log(width, height)
        const buttonMenu = new Button( this, 120, 680, 'button-menu', 'button-menu-hover').setScale(0.45);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);

        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Menu');
         })
  
         //=============Crear cuadricula ========================//
         for (var i = 0; i < 16; i++) {
            bmd[i] = document.createElement('canvas');
            bmd[i].ctx = bmd[i].getContext('2d');
            bmd[i].ctx.beginPath();
            bmd[i].ctx.rect(0, 0, width, height);
            bmd[i].ctx.strokeStyle = "lightgray";
            bmd[i].ctx.strokeRect(0, 0, width, height);
            bmd[i].ctx.fillStyle = 'dimgray';
            this.textures.addCanvas('rectangle'+i, bmd[i]);
          }

          for (var i = 0; i < bmd.length; i++) {
            bmd[i].ctx.fill();
            bmd[i].ctx.stroke();
            block[i] = this.add.sprite(200,100, 'rectangle'+i);
            block[i].inputEnabled = true;
            block[i].tint = 0xffffff;//778899
          }

          for (var i = 1; i < block.length; i++) {
            if (i % 4 == 0) {
              block[i].x = block[0].x;
              block[i].y = block[i - 1].y + block[i - 1].height;
            } else {
              block[i].x = block[i - 1].x + block[i - 1].width;
              block[i].y = block[i - 1].y
            }
          }
           //=====================================//
           var x = 0;
           var y = 0;
           var r = 0;
           var d = 0;
           for (var i = 0; i < block.length; i++) {
             if (i < 8) { block[i].flag = i; }
             if (i > 7) { block[i].flag = i - 8; }
             r = this.GetRandomNum(i, block.length - 1);
             d = this.GetRandomNum(i, block.length - 1);
             x = block[d].x;
             y = block[d].y;
             block[d].x = block[r].x;
             block[d].y = block[r].y;
             block[r].x = x;
             block[r].y = y;
           }
           for (var i = 0; i < block.length; i++) {
             card[i] = this.add.sprite(block[i].x, block[i].y, 'card');
             card[i].setScale(0.45);
             card[i].frame = block[i].flag;
             card[i].alpha = 0;
           }
     
    }

    update(){
        for (var i = 0; i < block.length; i++) {
            block[i].setInteractive();
            block[i].on('pointerdown', ()=>{
                {
                    var i = 0;
                    for (var i = 0; i < 16; i++) {
              
                      card[i].alpha = 0;
                      if (block.x == card[i].x & block.y == card[i].y) {
                        card[i].alpha = 1;
                        console.log("Presionado primero")
                      }
                    }
                    times += 1;
                    if (times % 2 == 1) {
                      cur = block.flag;
                      bcur = block;
                    } else {
                      pre = cur;
                      bpre = bcur;
                      cur = block.flag;
                      bcur = block;
                      if (pre == cur) {
                        if (bpre == bcur) { return; }
                        block.flag = "";
                        bpre.tint = 0xff7777;
                        block.tint = 0xff7777;
                        bpre.inputEnabled = false;
                        block.inputEnabled = false;
                        
                        console.log("Correcto!")
                        for (var i = 0; i < 16; i++) {
                          card[i].alpha = 0;
                          
                        console.log("Escondiendo cartas")
                        }
              
                      }
                    }
                  }
            }, this);
          }
          var j = 0;
          for (var i = 0; i < block.length; i++) {
            if (block[i].tint == 0xff7777) { j++ }
            if (j == block.length) {
              
              var sec = 0;
              
            }
          }
    
    }
    
    GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
      }
}
export default Memoria;