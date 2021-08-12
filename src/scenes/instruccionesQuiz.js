import Button from '../gameObjects/button.js';

class InstruccionesQuiz extends Phaser.Scene {
    
   
    constructor(){
        super({key: "InstruccionesQuiz"});
    }

    create(){
        console.log('Instrucciones')
        // console.log(this)
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        
        const buttonPreguntas = new Button( this, center_width, center_height + 200, 'button-menu', 'button-menu-hover');
        buttonPreguntas.text.text = 'Iniciar';
        this.add.existing(buttonPreguntas);
        buttonPreguntas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Scene_preguntas');
        })
        
      

    
    }
}

export default InstruccionesQuiz;