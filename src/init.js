import Bootloader from './bootloader.js'
import Scene_play from './scenes/scene_play.js';
import Scene_play_final from './scenes/scene_play_final.js';
import Scene_preguntas from './scenes/scene_preguntas.js';
import Scene_preguntas_final from './scenes/scene_preguntas_final.js';
import Menu from './scenes/menu.js';
import InstruccionesQuiz from './scenes/instruccionesQuiz.js';
import Memoria from './scenes/memoria.js';

var config = {
    widht: 1024,
    height: 720,
    parent: 'container',
    dom: {
        createContainer: true
    },
    backgroundColor: '#4990e2',
    type: Phaser.AUTO,
    scene: [
        Bootloader,
        Menu,
        InstruccionesQuiz,
        Scene_play,
        Scene_play_final,
        Scene_preguntas,
        Scene_preguntas_final,
        Memoria
    ]
}

var game = new Phaser.Game(config);

