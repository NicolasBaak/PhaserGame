class Bootloader extends Phaser.Scene {

    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        this.load.on("complete", ()=>{
            this.scene.start("Menu");
        });

        //Musica de fondo para cada escena
        this.load.audio('M_menu', './src/assets/audio/fondo/Ambler-menu.mp3');
        this.load.audio('M_puzzle', './src/assets/audio/fondo/TwoFingerJohnny_puzzle.mp3');
        this.load.audio('M_quiz', './src/assets/audio/fondo/MoonlightHall_quiz.mp3');
        this.load.audio('M_name', './src/assets/audio/fondo/MartyGotsaPlan_name.mp3');
        this.load.audio('M_lose', './src/assets/audio/fondo/KrampusWorkshop_lose.mp3');
        this.load.audio('M_mid', './src/assets/audio/fondo/HappyBoyEndTheme_mid.mp3');
        this.load.audio('M_win', './src/assets/audio/fondo/MoveForward_win.mp3');
        this.load.audio('M_memorama', './src/assets/audio/fondo/Hackbeat_memorama.mp3');
        //Efectos de sonido las escenas
        this.load.audio('click', './src/assets/audio/click.ogg');
        this.load.audio('click-answer', './src/assets/audio/click-answer.mp3');
        this.load.audio('clickRight', './src/assets/audio/right.ogg');
        //Background de los juegos
        this.load.image("button-menu" , "./src/assets/images/ButtonMenu.png");
        this.load.image("bg-menu" , "./src/assets/images/bg_menu.jpeg");
        this.load.image("bg-quizz" , "./src/assets/images/bg_quizz.jpeg");
        this.load.image("bg-nombre" , "./src/assets/images/bg_nombre.jpeg");
        // Botones
        this.load.image("bg-rompecabezas" , "./src/assets/images/bg_rompecabezas.jpeg");
        this.load.image("button-menu-hover" , "./src/assets/images/ButtonMenuHover.png");
    
       this.load.image("jindu", "./src/assets/images/jindu.png");
        this.load.image("jinduBg", "./src/assets/images/jinduBg.png");

        //Cargar imagenes del rompecabezas 
        for(var i = 1;i < 6;i++) {
            this.load.spritesheet("puzzle-"+i.toString(), "./src/assets/images/puzzle-"+i.toString()+".png", { frameWidth: 184, frameHeight: 184 });        
        }

        //Memorama
        this.load.spritesheet('card1', './src/assets/images/card1.png', {frameWidth: (700 / 4), frameHeight:  (787 / 3), endFrame: 12});
        this.load.spritesheet('card2', './src/assets/images/card2.png', {frameWidth: (700 / 4), frameHeight:  (787 / 3), endFrame: 12});
        this.load.spritesheet('card3', './src/assets/images/card3.png', {frameWidth: (700 / 4), frameHeight:  (787 / 3), endFrame: 12});
        
        //Font
        this.load.bitmapFont('minecraft', './src/assets/fonts/minecraft.png', './src/assets/fonts/minecraft.xml');  
    
    }
}

export default Bootloader;