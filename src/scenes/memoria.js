class Memoria extends Phaser.Scene{
    constructor(){
        super({key: 'Memoria'});
        var progressText;
    }
    preload(){
    }
    create(){
        this.game.sound.stopAll();
        this.sound.add('M_memorama', {loop:true, volume: 0.3}).play();
   
    }
}
export default Memoria;