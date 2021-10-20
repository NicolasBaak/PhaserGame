import Button from '../gameObjects/button.js';

let initialValue = {
    currentQuestion: 0,
    recordedAnswer: {},
    username: ''
}

// Variable que contiene el estado del juego
let gameState = initialValue;
let numQuestion = 0;
let nextQuestionSetTimeOut;
            
class Scene_preguntas extends Phaser.Scene {

    constructor(){
        super({key: "Scene_preguntas"});
    }

    create(){
        this.maxQuestions = 5;
        let nombres = document.querySelectorAll('input');
        nombres.forEach((nombre)=>{
            nombre.remove();
        })
   
        // carga estado del juego
        this.loadGameState();

        //let questions = this.cache.json.get('questions');
        //let question = questions[gameState.currentQuestion];
        let question = this.getQuestion(gameState.currentQuestion);
        //console.log(gameState.currentQuestion);
        //console.log("pregunta:", question);
        // opción selecionada: undefined 'a', 'b' ó 'c'
        let selectedAnswer = gameState.recordedAnswer[gameState.currentQuestion];
   
        //Variables
        this.game.sound.stopAll();
        this.sound.add('M_quiz', {loop:true, volume: 0.3}).play();
   
        let clickAnswerAudio = this.sound.add('click-answer', {loop:false}); 
        let click = this.sound.add('click', {loop:false}); 
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
    
        this.background = this.add.image(center_width, center_height , 'bg-quizz');
    
        this.pregunta = this.add.bitmapText(center_width-250, center_height-180, 'minecraft', question.text).setMaxWidth(250)
        
        //Informacion del jugador
        this.jugador = this.add.bitmapText(center_width-250, center_height+30, 'minecraft',  `Pregunta ${gameState.currentQuestion+1} para ${gameState.username}! `).setMaxWidth(280).setFontSize(24);
        
        const buttonMenu = new Button( this, center_width-100, center_height+110, 'Regresar').setScale(0.6);
        const opcA = new Button( this, center_width+150, center_height-120, question.a).setScale(1.2);
        const opcB = new Button( this, center_width+150, center_height, question.b).setScale(1.2);
        const opcC = new Button( this, center_width+150, center_height+120, question.c).setScale(1.2);

        this.add.existing(buttonMenu);
        buttonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clearTimeout(nextQuestionSetTimeOut);
            click.play();
            this.scene.start('Menu');
        })
        
        this.add.existing(opcA);
        opcA.text.setFontSize(20).setMaxWidth(opcC.upImage.width*1.3)
        opcA.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAnswerAudio.play();
            selectedAnswer = 'a';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima this.pregunta, con 2 segundos de espera
            nextQuestionSetTimeOut = setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;
                numQuestion++
                //this.questionExists(nextQuestion)
                if (numQuestion < this.maxQuestions) {
                    
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.scene.restart();
                }
                else {
                    numQuestion = 0
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.resetGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })

        this.add.existing(opcB);
        opcB.text.setFontSize(20).setMaxWidth(opcC.upImage.width*1.3)
        opcB.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAnswerAudio.play();
            selectedAnswer = 'b';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima this.pregunta, con 2 segundos de espera
            nextQuestionSetTimeOut = setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;
                numQuestion++
               // this.questionExists(nextQuestion)
                if (numQuestion < this.maxQuestions) {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.scene.restart();
                    
                }
                else {
                    numQuestion = 0
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.resetGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })
        

        this.add.existing(opcC);
        opcC.text.setFontSize(20).setMaxWidth(opcC.upImage.width*1.3)
        opcC.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            clickAnswerAudio.play();
            selectedAnswer = 'c';
            if (selectedAnswer == question.answer) {
                this.pregunta.setText('Correcto! 😄');
                this.savedOption += 1;
            }
            else {
                this.pregunta.setText('La respuesta fue incorrecta 🤔');
            }
            // ir a la proxima pregunta, con 2 segundos de espera
            nextQuestionSetTimeOut = setTimeout(() => {
                let nextQuestion = gameState.currentQuestion + 1;
                numQuestion++
                if (numQuestion < this.maxQuestions) {
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.scene.restart();
                }
                else {
                    numQuestion = 0;
                    gameState.recordedAnswer[gameState.currentQuestion] = selectedAnswer;
                    gameState.currentQuestion = nextQuestion;
                    this.saveGameState();
                    this.resetGameState();
                    this.scene.start('Scene_preguntas_final');
                }
            }, 2000);
        })
    }

    getQuestion = function (questionID) {
        let questions = this.cache.json.get('questions');
        // Desordena el arreglo de preguntas para que no salgan en el mismo orden
        while (questions[0].text == '01 Primera Pregunta' && questions[1].text == '02 Segunda Pregunta' && questions[2].text == '03 Tercera Pregunta') {
            // console.log(questions);
            questions = questions.sort(function () {
                return Math.random() - 0.5;
            });
            //console.log("new: ", questions);
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


    /**
     * función resetGameState
     *  limpia el estado actual del juego y lo inicializa
     */
    resetGameState() {
        gameState = {
            currentQuestion: 0,
            recordedAnswer: {},
            username: ''};
    }

    /**
     * función saveGameState
     *  guarda el estado actual del juego
     */
    saveGameState() {
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }

    /**
     * función loadGameState
     *  obtiene el estado del juego y lo carga
     */
    loadGameState() {
        let str = localStorage.getItem("gameState");

        if (str != null) {
            gameState = JSON.parse(str);
        }

        let name = localStorage.getItem("nombreJugador");
        if(name != null){
            gameState.username = name;
        }else{
            gameState.username = "Jugador";
        }
    }


}

export default Scene_preguntas;

