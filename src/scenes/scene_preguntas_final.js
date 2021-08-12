
import Button from '../gameObjects/button.js';

class Scene_preguntas_final extends Phaser.Scene{

    constructor(){
        super({key: "Scene_preguntas_final"});
    }
    preload(){
        this.load.json('questions', 'data/questions.json');
    }
    create(){
        loadGameState();
        
        let username = localStorage.getItem('nombreJugador');
        //Variables
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;

        let questions = this.cache.json.get('questions');
        let score = 0;
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
        this.titulo = this.add.text(center_width-150, 140,  'Fin del juego 🎉' , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});


         // texto de aciertos
        this.miscore = this.add.text(center_width-150, 240,   'Aciertos: ' + totalHits + ' / ' + (totalHits + totalQuestion) , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});



         // texto de aciertos
         this.scoreText = this.add.text(center_width-150, 340,   'Porcentaje: ' + Math.floor(score) + '%' , { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});

    // textos que se muestran de acuerdo al porcentaje obtenido
    if (Math.floor(score) <= 30) {
        let scoreText = this.add.text(center_width, 300, 'No te preocupes por el resultado ' + username + ',\n recuerda que la práctica hace al maestro!! 🦾', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});
        scoreText.setOrigin(0.5, -2.5);
    } else if (Math.floor(score) <= 66) {
        let scoreText = this.add.text(center_width, 300, 'Lo hiciste bien ' + username + '!, pero recuerda \nque siempre puedes mejorar 😎', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});
        scoreText.setOrigin(0.5, -2.5);
    } else if (Math.floor(score) <= 80) {
        let scoreText = this.add.text(center_width, 300, 'Muy bien ' + username + '!!\n Tu resultado refleja que tienes buenos conocimientos 😋', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});
        scoreText.setOrigin(0.5, -2.5);
    } else {
        let scoreText = this.add.text(center_width, 300, 'Excelente ' + username+ ', muchas felicidades!!! 🥇\n, el esfuerzo de tu estudio se nota', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'});
        scoreText.setOrigin(0.5, -2.5);
    }

    const restartButton = new Button( this, center_width-150, center_height*2-50, 'button-menu', 'button-menu-hover').setScale(0.5);
    const MenuButton = new Button( this, center_width+150, center_height*2-50, 'button-menu', 'button-menu-hover').setScale(0.5);
      
    this.add.existing(restartButton);
    restartButton.text.text = 'Nuevo Intento';
    restartButton.setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
        resetGameState();
        location.reload();
        this.scene.start('Scene_preguntas');
    })
    
    this.add.existing(MenuButton);
    MenuButton.text.text = 'Menu principal';
    MenuButton.setInteractive()
    .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
        resetGameState();
        location.reload();
        this.scene.start('Menu');
    })

    }
}

// Objeto inicializador del juego
let initialGameState = {
    currentQuestion: 0,
    recordedAnswer: {}
}
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


export default Scene_preguntas_final;