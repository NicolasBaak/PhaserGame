class Button extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, upImage, overImage){
        super(scene, x, y);

        this.upImage = scene.add.image( 0, 0, upImage);
        this.overImage = scene.add.image( 0, 0, overImage);
        this.text = scene.add.text(0, 0, 'Button', { fontFamily: 'Minecraft, Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: '32px'})
        .setOrigin(0.5, 0.5)

        this.upImage.setScale(0.8)
        this.overImage.setScale(0.8)

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