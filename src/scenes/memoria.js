import Button from '../gameObjects/button.js';

// Variable que contiene el estado del juego
let gameState = {time: 1, win: false}

var bmd = [];
var block = [];
var card = [];

var aux = 0;
var bpre;
var bcur;
var pre = -1;
var cur = -1;

class Memoria extends Phaser.Scene{
    constructor(){
        super({key: 'Memoria'});       
    }

    init(){
        //Variables del tiempo
        this.time = 25;
        this.timeElapsed = 0;
        this.maxTime = 1;
    }
    preload(){
      this.resetGameState();
      //Memorama
      this.load.spritesheet('card', './src/assets/images/card5.png', {frameWidth: (700 / 4), frameHeight:  (787 / 3), endFrame: 12});
    }
   
    create(){
        
        this.game.sound.stopAll();
        this.sound.add('M_memorama', {loop:true, volume: 0.3}).play();

        let width = 90;
        let height = 120;

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        this.background = this.add.image(center_width, center_height , 'bg-quizz');

        this.title = this.add.bitmapText(230, 180, 'minecraft','Memorama').setFontSize(40);
        

        this.jinduBg = this.add.sprite(center_width-170, center_height-50, 'jinduBg').setScale(0.4)
        this.jindu = this.add.sprite(center_width-170, center_height-50, 'jindu').setScale(0.5)

        //Tiempo
        this.timeText = this.add.bitmapText(center_width-250, center_height-90, 'minecraft',`Tiempo: ${this.time} seg.`).setFontSize(28);

        var tween = this.tweens.add({
            targets: this.jindu,
            props: {
                scaleX: { value: 0, duration: this.time * 1000, ease: 'None', repeat: 0 }
            }
        });

        const buttonMenu = new Button( this, center_width-140, center_height+140, 'button-menu', 'button-menu-hover').setScale(0.5);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);
        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            
            this.scene.start('Menu');
         })
        
         //=============Crear cuadricula ========================//
         for (let i = 0; i < 12; i++) {
            bmd[i] = this.textures.createCanvas('bmd'+i, width, height);
            bmd[i].context.beginPath();
            bmd[i].context.rect(0, 0, width, height);
            bmd[i].context.strokeStyle = '#D3D3D3'
            bmd[i].context.strokeRect(0, 0, width, height);
            bmd[i].context.fillStyle = '#696969';
            
          }
          for (let i = 0; i < bmd.length; i++) {
            bmd[i].context.fill();
            bmd[i].context.stroke();
            bmd[i].refresh();
            block[i] = this.add.sprite(440, 160, bmd[i]);
            block[i].setOrigin(0,0)
            block[i].setInteractive();
            block[i].tint = 0x6FA990//778899
           
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

          var x = 0;
          var y = 0;
          var r = 0;
          var d = 0;

          for (var i = 0; i < block.length; i++) {
            if (i < 6) { block[i].flag = i; }
            if (i > 5) { block[i].flag = i - 6; }
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
            card[i].setOrigin(-0.1, 0);
            card[i].setScale(0.45);
            card[i].setFrame (block[i].flag);
            card[i].alpha = 0;

          }
          
          for (var i = 0; i < block.length; i++) {
            block[i].on('pointerdown', function(pointer){
             
              var i = 0;
              for (var i = 0; i < 12; i++) {
        
                card[i].alpha = 0;
                if (this.x == card[i].x & this.y == card[i].y) {
                  card[i].alpha = 1;
                }
              }
              aux += 1;
              if (aux % 2 == 1) {
                cur = this.flag;
                bcur = this;
              } else {
                pre = cur;
                bpre = bcur;
                cur = this.flag;
                bcur = this;
                if (pre == cur) {
                  if (bpre == bcur) { return; }
                  this.flag = "";
                  bpre.tint = 0xC3CD8E;
                  this.tint = 0xC3CD8E;
                  bpre.disableInteractive();
                  this.disableInteractive();
                  for (var i = 0; i < 12; i++) {
                    card[i].alpha = 0;
                  }
        
                }
              }
              if(this.scene.checkSort()){
                gameState.time = this.scene.time;
                gameState.win = true;
                this.scene.saveGameState();
              }
            });
          }
    }
    

    GetRandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      return (Min + Math.round(Rand * Range));
    }

    checkSort(){
      var ifFinash = true;
      for(let i =0; i< 12; i++){
        //console.log("check: ", block[i].tintTopLeft);
        if(block[i].tintTopLeft ===  7317904){
          ifFinash = false;
        }
      }
      
      return ifFinash;
    }

    /**
     * función resetGameState
     *  limpia el estado actual del juego y lo inicializa
     */
     resetGameState() {
        gameState = {time: 1, win: false};
        
        for(let i=0; i < 12; i++ ){
          //console.log("textura: ", this.textures.get('bmd'+i).key)
          if(this.textures.get('bmd'+i).key !== "__MISSING"){
            this.textures.remove('bmd'+i)
          }
        }
    }
    /**
     * función saveGameState
     *  guarda el estado actual del juego
     */
     saveGameState() {
      window.localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    update(time, delta){
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
export default Memoria;