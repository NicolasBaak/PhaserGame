
import Button from '../gameObjects/button.js'

class Scene_play extends Phaser.Scene {

    constructor(){
        super({key: "Scene_play"});
    }

    create(){
        //Variables
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        //Establece rectangulo donde se dibujara la imagen
        this.add.rectangle(center_width, center_height+125, 800, 750, 0xd689b3);
        
        // Titulo del juego
        this.titulo = this.add.image(230, 70, "titulo-romp");
        this.titulo.setScale(0.5);  
        this.titulo.setAngle(-5);

        //texto con informacion sobre los dientes
        this.add.text(center_width+150, 40, 'Un tercio de tus dientes está \npor debajo de la encía.', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif'});

        this.add.image(center_width, center_height+70, 'dientes');

        const buttonMenu = new Button( this, 120, center_height*2-40, 'button-menu', 'button-menu-hover').setScale(0.45);
        buttonMenu.text.text = 'Regresar';
        this.add.existing(buttonMenu);

        buttonMenu.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, ()=>{
            this.scene.start('Menu');
        })
    }

    
    update(){
    
    }

}

export default Scene_play;