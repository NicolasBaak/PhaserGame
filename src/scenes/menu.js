import Button from '../gameObjects/button.js'

class Menu extends Phaser.Scene {

    constructor(){
        super({key: "Menu"});
    }

    create(){
        // console.log(this)
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        this.add.text(center_width-180, center_height-200, 'Menu Principal', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '64px'});
    
        const buttonRompecabezas = new Button( this, center_width, center_height, 'button-menu', 'button-menu-hover');
        buttonRompecabezas.text.text = 'Rompecabezas';
        this.add.existing(buttonRompecabezas);
        buttonRompecabezas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Scene_play');
        })
        
        const buttonPreguntas = new Button( this, center_width, center_height + 200, 'button-menu', 'button-menu-hover');
        buttonPreguntas.text.text = 'Preguntas';
        this.add.existing(buttonPreguntas);
        buttonPreguntas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('InstruccionesQuiz');
        })

    }

    
    update(){
    
    }

    actionOnClick () {

        
    }

}

export default Menu;