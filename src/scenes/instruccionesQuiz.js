import Button from '../gameObjects/button.js';

class InstruccionesQuiz extends Phaser.Scene {
    
   
    constructor(){
        super({key: "InstruccionesQuiz"});
    }
    preload(){
        this.load.json("questions", './src/data/questions.json');
    }
    
    create(){
        localStorage.clear();
   
        this.game.sound.stopAll();
        this.sound.add('M_name', {loop:true, volume: 0.3}).play();
   
        let clickAnswerAudio = this.sound.add('click-answer', {loop:false}); 
   
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        this.background = this.add.image(center_width, center_height , 'bg-nombre');

        //Se crea el input de tipo text para inresar el nombre del jugador
        const nombre = document.createElement('input');
        nombre.type = 'text';
        nombre.classList.add('input-nombre');
        document.querySelector('main').insertBefore(nombre, document.querySelector('#container'));

        const buttonPreguntas = new Button( this, center_width, center_height+100, 'Iniciar');
        this.add.existing(buttonPreguntas);
        buttonPreguntas.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAnswerAudio.play();
            localStorage.setItem('nombreJugador', nombre.value);
            this.scene.start('Scene_preguntas');
        })
        
      

    
    }
}

export default InstruccionesQuiz;