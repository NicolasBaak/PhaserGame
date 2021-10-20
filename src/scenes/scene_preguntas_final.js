
import Button from '../gameObjects/button.js';
let gameState;
class Scene_preguntas_final extends Phaser.Scene{

    constructor(){
        super({key: "Scene_preguntas_final"});
    }
    preload(){
        this.load.json('questions', 'data/questions.json');
    }
    create(){
        this.loadGameState();
        let username = localStorage.getItem('nombreJugador');
        //Variables
        this.game.sound.stopAll();
        let M_win = this.sound.add('M_win', {loop:true, volume: 0.3});
        let M_mid = this.sound.add('M_mid', {loop:true, volume: 0.3});
        let M_lose = this.sound.add('M_lose', {loop:true, volume: 0.3});
        let rightAudio = this.sound.add('clickRight', {loop:false});
   
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        this.background = this.add.image(center_width, center_height , 'bg-quizz');

        let questions = this.cache.json.get('questions');
        let score = 68;
        let totalHits = 0;
        let totalQuestion = 0;
        let correctAnswer = [];
        let answerAnswered = [];
        let exact = [];
        let answered = [];

        
            // busca las respuestas correctas
        for (correctAnswer in questions) {
            exact[correctAnswer] = questions[correctAnswer].answer
        }

        // busca las respuestas respondidas por el usuario y compara aciertos
        for (answerAnswered in gameState.recordedAnswer) {
            answered[answerAnswered] = gameState.recordedAnswer[answerAnswered]
            if (answered[answerAnswered] == exact[answerAnswered]) {
                totalHits++;
            } else {
                totalQuestion++;
            }
        }

        // suma los puntos
        score = totalHits * 100 / (totalQuestion + totalHits)
        

        //texto con informacion sobre los dientes
        this.titulo = this.add.bitmapText(center_width-80, center_height-150, 'minecraft' ,'¡¡Fin del juego 🎉!!');


         // texto de aciertos
        this.miscore = this.add.bitmapText(center_width-80, center_height-100, 'minecraft' ,   'Aciertos - ' + totalHits + ' de ' + (totalHits + totalQuestion) );

         // texto de Porcentaje
        // this.scoreText = this.add.bitmapText(center_width-80, center_height-50,  'minecraft' , 'Porcentaje - ¡¡' + Math.floor(score) + '!!' );

    // textos que se muestran de acuerdo al porcentaje obtenido
    if (Math.floor(score) <= 30) {
        M_lose.play();
        let scoreText = this.add.bitmapText(center_width-220, center_height, 'minecraft' ,'No te preocupes por el resultado ' + username + ', recuerda que la práctica hace al maestro!! 🦾').setCenterAlign().setMaxWidth(500);
    } else if (Math.floor(score) <= 66) {
        M_mid.play();
        let scoreText = this.add.bitmapText(center_width-200, center_height, 'minecraft' ,'Lo hiciste bien ' + username + '!, pero recuerda que siempre puedes mejorar 😎').setCenterAlign().setMaxWidth(500);
    } else if (Math.floor(score) <= 80) {
        rightAudio.play();
        let scoreText = this.add.bitmapText(center_width-200, center_height, 'minecraft' , 'Muy bien ' + username + ' !!Tu resultado refleja que tienes buenos conocimientos 😋').setCenterAlign().setMaxWidth(500);
    } else {
        M_win.play();
        let scoreText = this.add.bitmapText(center_width-200, center_height, 'minecraft' , 'Excelente ' + username+ ', muchas felicidades!!! 🥇, el esfuerzo de tu estudio se nota').setCenterAlign().setMaxWidth(500);
    }

    let restartButton = new Button( this, center_width-100, center_height+130, 'Nuevo Intento').setScale(0.6);
    let MenuButton = new Button( this, center_width+100, center_height+130, 'Menu principal').setScale(0.6);
      
    this.add.existing(restartButton);
    restartButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
        this.resetGameState();
        // location.reload();
        this.scene.start('InstruccionesQuiz');
    })
    
    this.add.existing(MenuButton);
    MenuButton.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
        this.resetGameState();
        // location.reload();
        this.scene.start('Menu');
    })

    }

    /**
     * función resetGameState
     *  limpia el estado actual del juego y lo inicializa
     */
    resetGameState() {
        window.localStorage.clear();
        gameState = {
            currentQuestion: 0,
            recordedAnswer: {},
            username: ''
        };
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
        
    }
    
    /**
     * función resize
     *  redimensiona la pantalla
     */
    resize() {
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
}

export default Scene_preguntas_final;