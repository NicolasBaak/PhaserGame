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
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        //texto con informacion sobre los dientes
        this.titulo = this.add.text(center_width-300, 140,  'Bienvenido a Quiz Dental 🎉' , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '48px'});
      
        //texto con informacion sobre los dientes
        this.titulo_nombre = this.add.text(center_width-200, 240,  'Ingresa tu apodo o nombre:' , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});

        //Se crea el input de tipo text para inresar el nombre del jugador
        const nombre = document.createElement('input');
        nombre.type = 'text';
        nombre.classList.add('input-nombre');
        document.querySelector('main').insertBefore(nombre, document.querySelector('#container'));

        const buttonPreguntas = new Button( this, center_width, center_height + 200, 'button-menu', 'button-menu-hover');
        buttonPreguntas.text.text = 'Iniciar';
        this.add.existing(buttonPreguntas);
        buttonPreguntas.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            localStorage.setItem('nombreJugador', nombre.value);
            this.scene.start('Scene_preguntas');
        })
        
      

    
    }
}

export default InstruccionesQuiz;