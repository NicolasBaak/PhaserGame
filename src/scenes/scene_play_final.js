
import Button from '../gameObjects/button.js';

let gameState
class Scene_play_final extends Phaser.Scene {

    constructor() {
        super({ key: "Scene_play_final" });
        
    }
    create() {
        this.loadGameState();

        this.game.sound.stopAll();
        let M_win = this.sound.add('M_win', {loop:true, volume: 0.3});
        let M_lose = this.sound.add('M_lose', {loop:true, volume: 0.3});

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
    
        this.background = this.add.image(center_width, center_height , 'bg-quizz');

        if(gameState.win){
            M_win.play();
            this.add.bitmapText(center_width-200, center_height-100, 'minecraft',`Felicidades!! ganaste y todavia te sobraron ${gameState.time} segundos!!`).setFontSize(42).setMaxWidth(center_width);
        }else{
            M_lose.play();
            this.add.bitmapText(center_width-250, center_height-100, 'minecraft',"Casi lo logras, ¡vuelve a intentarlo! ¡¡tu puedes!!").setFontSize(42).setMaxWidth(center_width);
        }

        const buttonMenu = new Button( this, center_width, center_height+120, 'Regresar');
        this.add.existing(buttonMenu);
        buttonMenu.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
           this.resetGameState();
           this.scene.start('Menu');
        })
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
     * función resetGameState
     *  limpia el estado actual del juego y lo inicializa
     */
     resetGameState() {
        window.localStorage.clear();
    }

}

export default Scene_play_final