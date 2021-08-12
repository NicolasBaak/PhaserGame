
import Button from '../gameObjects/button.js';

// Objeto inicializador del juego
let initialGameState = {
    currentQuestion: 0,
    recordedAnswer: {},
    username: ''
};

// Variable que contiene el estado del juego
let gameState = initialGameState;


/**
 * función resetGameState
 *  limpia el estado actual del juego y lo inicializa
 */
function resetGameState() {
    localStorage.clear();
    gameState = initialGameState;
}

/**
 * función saveGameState
 *  guarda el estado actual del juego
 */
function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
}

/**
 * función loadGameState
 *  obtiene el estado del juego y lo carga
 */
function loadGameState() {
    let str = localStorage.getItem("gameState");

    if (str != null) {
        gameState = JSON.parse(str);
        // console.log(str)
    }
}

/**
 * función resize
 *  redimensiona la pantalla
 */
function resize() {
    let canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    let wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
}


class Scene_preguntas extends Phaser.Scene {

    constructor(){
        super({key: "Scene_preguntas"});
    }

    create(){

                // carga estado del juego
        loadGameState();
        //let questions = this.cache.json.get('questions');
        //let question = questions[gameState.currentQuestion];
        let question = this.getQuestion(gameState.currentQuestion);

         // opción selecionada: undefined 'a', 'b' ó 'c'
        let selectedAnswer = gameState.recordedAnswer[gameState.currentQuestion];
   
        //Variables
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        //Establece rectangulo donde se dibujara la imagen
        
        this.add.rectangle(0,0, 400, 400, 0xb2e998).setAngle(45);

        this.add.rectangle(320, 70, 550, 100, 0x4835dc);

        this.add.rectangle(center_width*2, center_height*2, 400, 400, 0xb2e998).setAngle(45);
        
        //texto con informacion sobre los dientes
        this.pregunta = this.add.text(100, 40, question.text , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});
        
        const buttonMenu = new Button( this, 150, center_height*2-50, 'button-menu', 'button-menu-hover').setScale(0.5);
        const opcA = new Button( this, center_width+100, center_height-150, 'button-menu', 'button-menu-hover', 'Hola');
        const opcB = new Button( this, center_width+100, center_height, 'button-menu', 'button-menu-hover');
        const opcC = new Button( this, center_width+100, center_height+150, 'button-menu', 'button-menu-hover');

        this.add.existing(buttonMenu);
        buttonMenu.text.text = 'Regresar';
        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Menu');
        })
        
        this.add.existing(opcA);
        opcA.text.text = question.a;
        opcA.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            selectedAnswer = 'a';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima this.pregunta, con 2 segundos de espera
            setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;

                if (this.questionExists(nextQuestion)) {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    saveGameState();
                    this.scene.restart();
                }
                else {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    // saveGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })


        this.add.existing(opcB);
        opcB.text.text = question.b;
        opcB.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            selectedAnswer = 'b';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima this.pregunta, con 2 segundos de espera
            setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;

                if (this.questionExists(nextQuestion)) {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    saveGameState();
                    this.scene.restart();
                }
                else {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    // saveGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })
        

        this.add.existing(opcC);
        opcC.text.text = question.c;
        opcC.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            selectedAnswer = 'c';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima pregunta, con 2 segundos de espera
            setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;

                if (this.questionExists(nextQuestion)) {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    saveGameState();
                    this.scene.restart();
                }
                else {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    // saveGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })
    }

    
    update(){
    
    }

    

    getQuestion = function (questionID) {
        let questions = this.cache.json.get('questions');
    
        // Desordena el arreglo de preguntas para que no salgan en el mismo orden
        while (questions[0].text == '01 Primera Pregunta' && questions[1].text == '02 Segunda Pregunta' && questions[2].text == '03 Tercera Pregunta') {
            console.log(questions);
            questions = questions.sort(function () {
                return Math.random() - 0.5;
            });
            console.log("new: ", questions);
        }
    
        return questions[questionID]; // puede ser undefined
    }
    
    // verifica se existe una pregunta con numero questionID
    questionExists = function (questionID) {
        if (this.getQuestion(questionID) != undefined) {
            return true;
        }
        else {
            return false;
        }
    }

}

export default Scene_preguntas;

