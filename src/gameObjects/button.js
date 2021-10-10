class Button extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, upImage, overImage){
        super(scene, x, y);

        this.upImage = scene.add.image( 0, 0, upImage).setScale(1.5, 1);
        this.overImage = scene.add.image( 0, 0, overImage).setScale(1.5, 1);
        this.text = scene.add.bitmapText(0, 0, 'minecraft','', 32, 1).setMaxWidth(this.upImage.width)
        .setOrigin(0.5, 0.5)

        this.overImage

        this.add(this.upImage)
        this.add(this.overImage)
        this.add(this.text)
       
        this.overImage.setVisible(false)

        this.setSize(this.upImage.width, this.upImage.height)
 
        this.setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, ()=>{
            this.upImage.setVisible(false);
            this.overImage.setVisible(true);
        })
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, ()=>{
            this.upImage.setVisible(true);
            this.overImage.setVisible(false);
        })

       
    }
}

export default Button;