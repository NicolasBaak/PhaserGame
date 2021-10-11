onload = function () {

    var startText;
    var restartText;
    var welcome;
    var gameover;
    var spend = 0;
    var str = "";
    var difTime = 0.07;
  
    var bootState = function (game) {
      this.preload = function () {
        game.load.image('loading', 'assets/preloader.gif');
      };
      this.create = function () {
        game.state.start('loader');
      };
    }
  
    var loaderState = function (game) {
      var progressText;
      this.init = function () {
        var sprite = game.add.image(game.world.centerX, game.world.centerY, 'loading');
        sprite.anchor = { x: 0.5, y: 0.5 };
        progressText = game.add.text(game.world.centerX, game.world.centerY + 30, '0%', { fill: '#fff', fontSize: '16px' });
        progressText.anchor = { x: 0.5, y: 0.5 };
      };
      this.preload = function () {
        game.load.image('welcome', 'assets/background3.png');
        game.load.image('gameover', 'assets/background4.png');
        game.load.spritesheet('card', './assets/card5.png', 700 / 4, 787 / 3, 12);
        game.load.image('timing', 'assets/timing.png')
        game.load.onFileComplete.add(function (progress) {
          progressText.text = progress + '%';
        });
  
      };
      this.create = function () {
        if (progressText.text == "100%") {
          game.state.start('welcome');
        }
      };
    }
  
    var welcomeState = function (game) {
  
      this.init = function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  
      }
  
      /**
       * 
       */
      this.preload = function () {
        this.load.image('easyButton', 'assets/button_green.png');
        this.load.image('mdButton', 'assets/button_yellow.png');
        this.load.image('difButton', 'assets/button_orange.png');
      };
  
      this.create = function () {
        welcome = game.add.image(0, 0, 'welcome');
        welcome.scale.setTo(0.7, 0.6);
        startText = game.add.text(12, 110, 'Haz click en una dificultad para empezar', { fill: '#ccc', fontSize: '16px' });
        startText.scale
        //startText=game.add.text(game.world.centerX,game.world.centerY,'Click en cualquier lugar para comenzar',{fill:'#000',fontSize:'16px'});
        //startText.anchor={x:0.5,y:0.5};
  
        // botón dificultad fácil
        let easyButton = this.add.sprite(110, 275, 'easyButton');
        let easyLabel = this.add.text(165, 290, 'Fácil', { fontSize: '18px', color: '#000' });
        easyLabel.anchor = { x: 0.5, y: 0.5 };
  
        // botón dificultad medio
        let mdButton = this.add.sprite(110, 300, 'mdButton');
        let mdLabel = this.add.text(165, 315, 'Medio', { fontSize: '18px', color: '#000' });
        mdLabel.anchor = { x: 0.5, y: 0.5 };
  
        // botón dificultad dificil
        let difButton = this.add.sprite(110, 325, 'difButton');
        let difLabel = this.add.text(165, 342, 'Díficil', { fontSize: '18px', color: '#000' });
        difLabel.anchor = { x: 0.5, y: 0.5 };
  
        // lógica del botón dificultad fácil        
        easyButton.inputEnabled = true;
        easyButton.input.useHandCursor = true;
        easyButton.events.onInputDown.add(function () {
          difTime = 0.05;
        });
  
        // lógica del botón dificultad medio        
        mdButton.inputEnabled = true;
        mdButton.input.useHandCursor = true;
        mdButton.events.onInputDown.add(function () {
          difTime = 0.07;
        });
  
        // lógica del botón dificultad díficil        
        difButton.inputEnabled = true;
        difButton.input.useHandCursor = true;
        difButton.events.onInputDown.add(function () {
          difTime = 0.09;
        });
  
        game.input.onDown.addOnce(Down, this);
      };
    }
  
    var gameoverState = function (game) {
      this.create = function () {
        gameover = game.add.image(0, 0, 'gameover');
        gameover.scale.setTo(0.7, 0.6);
        restartText = game.add.text(game.world.centerX, game.world.centerY, 'Click en cualquier lugar para comenzar', { fill: '#fff', fontSize: '16px' });
        restartText.anchor = { x: 0.5, y: 0.5 };
        var Text = game.add.text(0, 0, 'Tiempo restante: ' + spend + ' segundos', { fill: '#DC143C', fontSize: '21px' })
        Text.x = game.world.centerX - Text.width / 2;
        Text.y = game.world.centerY + Text.height * 1.5;
        var Text = game.add.text(0, 0, str, { fill: '#DC143C', fontSize: '21px' })
        Text.x = game.world.centerX - Text.width / 2;
        Text.y = game.world.centerY + Text.height * 1.5 * 2;
        game.input.onDown.addOnce(reDown, this);
      };
    }
  
    var times = 0;
    var bpre;
    var bcur;
    var pre = -1;
    var cur = -1;
    var boolean = false;
    var timing;
  
    var gameState = function (game) {
  
      this.init = function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      }
  
      var bmd = [];
      var block = [];
      var card = [];
      var stime = 0;
      this.create = function () {
        //以下代码为获取游戏界面大小
        var width = game.world.width / 4;
        var height = game.world.height / 4;
  
        //Establecer un cuadrilla de 4 por 4
        //以下代码为产生贴图数据
        for (var i = 0; i < 16; i++) {
          bmd[i] = game.add.bitmapData(width, height);
          bmd[i].ctx.beginPath();
          bmd[i].ctx.rect(0, 0, width, height);
          bmd[i].ctx.strokeStyle = "lightgray";
          bmd[i].ctx.strokeRect(0, 0, width, height);
          bmd[i].ctx.fillStyle = 'dimgray';
        }
        //以下代码为生成贴图
        for (var i = 0; i < bmd.length; i++) {
          bmd[i].ctx.fill();
          bmd[i].ctx.stroke();
          block[i] = game.add.sprite(0, 0, bmd[i]);
          block[i].inputEnabled = true;
          block[i].tint = 0xffffff;//778899
        }
        //以下代码为层次排列
        for (var i = 1; i < block.length; i++) {
          if (i % 4 == 0) {
            block[i].x = block[0].x;
            block[i].y = block[i - 1].y + block[i - 1].height;
          } else {
            block[i].x = block[i - 1].x + block[i - 1].width;
            block[i].y = block[i - 1].y
          }
        }
  
        //以下代码为随机排列
        var x = 0;
        var y = 0;
        var r = 0;
        var d = 0;
        for (var i = 0; i < block.length; i++) {
          if (i < 8) { block[i].flag = i; }
          if (i > 7) { block[i].flag = i - 8; }
          r = GetRandomNum(i, block.length - 1);
          d = GetRandomNum(i, block.length - 1);
          x = block[d].x;
          y = block[d].y;
          block[d].x = block[r].x;
          block[d].y = block[r].y;
          block[r].x = x;
          block[r].y = y;
        }
        for (var i = 0; i < block.length; i++) {
          card[i] = game.add.sprite(block[i].x, block[i].y, 'card');
          card[i].scale.setTo(0.45);
          card[i].frame = block[i].flag;
          card[i].alpha = 0;
        }
  
        timing = game.add.sprite(0, 0, 'timing');
        timing.x = game.world.centerX - timing.width / 2;
        timing.y = timing.height;
      };
  
      this.update = function () {
  
        for (var i = 0; i < block.length; i++) {
          block[i].events.onInputDown.add(onDown, this);
        }
        var j = 0;
        for (var i = 0; i < block.length; i++) {
          if (block[i].tint == 0xff7777) { j++ }
          if (j == block.length) {
            spend = stime;
            var sec = 0;
            game.time.events.loop(Phaser.Timer.SECOND, function () {
              sec += 1;
              if (sec == 1) {
                game.state.start('gameover');
              }
            }, this);
          }
        }
  
        var t = 0;
        game.time.events.loop(Phaser.Timer.SECOND, function () {
          t = t + 1;
          stime = t;
          if (t <= 10) {
            str = "Para tí es muy fácil este juego"
          } else if (t > 10 & t < 20) {
            str = "Eso fue rápido!!"
          } else {
            str = "Muy bien, a tiempo!"
          }
          if (timing.width <= 0) {
            timing.kill();
            str = "Ánimo, puedes mejorar"
            stime = 0;
            game.state.start('gameover');
          }
  
        }, this);
        timing.width -= difTime;
      }
  
      function onDown(block) {
        var i = 0;
        for (var i = 0; i < 16; i++) {
  
          card[i].alpha = 0;
          if (block.x == card[i].x & block.y == card[i].y) {
            card[i].alpha = 1;
          }
        }
        times += 1;
        if (times % 2 == 1) {
          cur = block.flag;
          bcur = block;
        } else {
          pre = cur;
          bpre = bcur;
          cur = block.flag;
          bcur = block;
          if (pre == cur) {
            if (bpre == bcur) { return; }
            block.flag = "";
            bpre.tint = 0xff7777;
            block.tint = 0xff7777;
            bpre.inputEnabled = false;
            block.inputEnabled = false;
            for (var i = 0; i < 16; i++) {
              card[i].alpha = 0;
            }
  
          }
        }
      }
    }
  
    function Down() {
      startText.destroy();
      game.state.start('main');
    }
  
    function reDown() {
      restartText.destroy();
      game.state.start('main');
    }
  
    var game = new Phaser.Game(320, 480, Phaser.CANVAS);
    game.state.add('boot', bootState);
    game.state.add('loader', loaderState);
    game.state.add('welcome', welcomeState);
    game.state.add('main', gameState);
    game.state.add('gameover', gameoverState);
    game.state.start('boot');
  }
  
  function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
  }