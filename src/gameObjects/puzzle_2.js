class Puzzle_2 extends Phaser.Scene {

    constructor(game, pic, square){
        super(game, type);
        game.add.existing(this);
    }

    preload(){
        this.pic = pic;
        this.square = square;
        this.won = false; 

        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        //load source image to get image height/width properties
        this.src_image = this.game.add.image(center_width, center_height , pic);
        this.src_image.anchor.setTo(0.5);
        this.src_image.visible = false;

        let w = this.src_image.width;
        let h = this.src_image.height;

        //User to center piece
        this.offsetX = (center_width - w)/2;
        this.offsetY = (center_height - h)/2;

        this.tile_width = Math.floor(w/this.square);
        this.tile_height = Math.floor(h/this.square);

        this.pieces = [];
		this.slots = [];
        this.background = {};
		this.piece_list = {};

        //Setup Background Game Board
        for (var i = 0; i < this.square;i++) {
            for (var j = 0; j < this.square;j++) {
  
                  var slot = this.game.add.sprite(this.offsetX+j*this.tile_width,this.offsetY+i*this.tile_height, this.makeBox(this.tile_width, this.tile_height));
                  slot.j = j;
                  slot.i = i;
                  this.background[j+'_'+i] = slot;
                  this.slots.push(slot);
              }
          }
          var choice = [-1, 1]; 

        for (var i = 0; i < this.square;i++) {
            for (var j = 0; j < this.square;j++) {

                var sides = {ls: 0, bs: 0, rs: 0, ts: 0};

                //above - choose piece to fit the above piece
                if (this.piece_list[j+'_'+(i-1)] !== undefined) {
                sides.ts = this.piece_list[j+'_'+(i-1)].bottom_side * -1;
                }else {
                sides.ts = choice[rand(0,1)]; 
                }

                //left - choose piece to fit the left piece
                if (this.piece_list[(j-1)+'_'+i] !== undefined) {
                sides.ls = this.piece_list[(j-1)+'_'+i].right_side * -1;
                }else {
                sides.ls = choice[rand(0,1)]; 
                }

                //bottom
                sides.bs = choice[rand(0,1)];

                //right
                sides.rs = choice[rand(0,1)];

                if (j === (this.square -1)) { sides.rs = 0; }
                if (i === 0) { sides.ts = 0; }
                if (i === (this.square - 1)) { sides.bs = 0; }
                if (j === 0) { sides.ls = 0; }

                var piece = new PuzzlePiece(this.game, this.offsetX+j*this.tile_width, this.offsetY+i*this.tile_height, j, i, this.tile_width, this.tile_height,pic, sides);

                        piece.events.onDragStart.add(this.onDragStart, this);
                        piece.events.onDragStop.add(this.onDragStop, this);
                        
                this.pieces.push(piece);
                this.piece_list[j+'_'+i] = piece;
            }
        }
    }

}

export default Puzzle_2;