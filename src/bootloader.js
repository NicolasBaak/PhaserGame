class Bootloader extends Phaser.Scene {

    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        this.load.on("complete", ()=>{
            this.scene.start("Scene_play");
        });

        //MENU BOOT
        this.load.image("button-menu" , "./src/assets/images/ButtonMenu.png");
        this.load.image("button-menu-hover" , "./src/assets/images/ButtonMenuHover.png");
    


        //ROMPECABEZAS BOOT
        this.load.image("titulo-romp" , "./src/assets/images/titulo-rompecabezas.png");
        this.load.image("dientes" , "./src/assets/images/dientes.jpg");
        //Cargar imagenes del rompecabezas 
        //for(var i = 1;i < 10;i++) {
        //     this.game.load.image(i.toString(), 'assets/images/'+i.toString()+'.png');
        // }
    }
}

export default Bootloader;