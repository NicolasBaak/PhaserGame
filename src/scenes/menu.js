import Button from '../gameObjects/button.js'

class Menu extends Phaser.Scene {

    constructor(){
        super({key: "Menu"});
    }

    create(){
        this.game.sound.stopAll();

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        //this.add.text(center_width-220, center_height-300, 'Menu Principal', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '64px'});
    
        this.background = this.add.image(center_width, center_height , 'bg-menu');

        let clickAudio = this.sound.add('click', {loop:false});
        this.sound.add('M_menu', {loop:true, volume: 0.3}).play();
   
        const buttonRompecabezas = new Button( this, center_width-200, center_height+20, 'button-menu', 'button-menu-hover').setScale(0.8);
        buttonRompecabezas.text.text = 'Puzzle';
        this.add.existing(buttonRompecabezas);
        buttonRompecabezas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('Scene_play');
        })
        
        const buttonPreguntas = new Button( this, center_width , center_height+20, 'button-menu', 'button-menu-hover').setScale(0.8);
        buttonPreguntas.text.text = 'Preguntas';
        this.add.existing(buttonPreguntas);
        buttonPreguntas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('InstruccionesQuiz');         
        })
        
        const buttonMemoria = new Button( this, center_width + 200, center_height+20, 'button-menu', 'button-menu-hover').setScale(0.8);
        buttonMemoria.text.text = 'Memorama';
        this.add.existing(buttonMemoria);
        buttonMemoria.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAudio.play();
            this.scene.start('Memoria');
        })

    }

    
    update(){
    
    }

    actionOnClick () {

        
    }

}

export default Menu;