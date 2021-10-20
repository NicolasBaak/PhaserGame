import Button from '../gameObjects/button.js'

class Menu extends Phaser.Scene {

    constructor(){
        super({key: "Menu"});
    }

    create(){
        this.game.sound.stopAll();

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
    
        this.background = this.add.image(center_width, center_height , 'bg-menu');

        let clickAudio = this.sound.add('click', {loop:false});
        this.sound.add('M_menu', {loop:true, volume: 0.3}).play();
   
        const buttonRompecabezas = new Button( this, center_width-200, center_height+20, 'Puzzle').setScale(0.8);
        this.add.existing(buttonRompecabezas);
        buttonRompecabezas.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('Scene_rompecabezas');
        })
        
        const buttonPreguntas = new Button( this, center_width , center_height+20, 'Preguntas').setScale(0.8);
        this.add.existing(buttonPreguntas);
        buttonPreguntas.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('InstruccionesQuiz');         
        })
        
        const buttonMemoria = new Button( this, center_width + 200, center_height+20, 'Memorama').setScale(0.8);
        this.add.existing(buttonMemoria);
        buttonMemoria.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('Memoria', {nivel: 1});
        })

    }

    
    update(){
    
    }

    actionOnClick () {

        
    }

}

export default Menu;