
function Game(canvasElement) {

  this.canvas = canvasElement;
  this.canvas.width = window.innerWidth;
  this.canvas.height = 600;
  this.ctx = this.canvas.getContext("2d");
  
  this.bg = new Background(this.ctx);
  this.frog = new Frog(this.ctx);
  this.wood = new Wood(this.ctx);
  
  this.cars = [];
  this.trees = [];
  this.flies = [];
  this.fliesEat = [];
  this.woods = [];
  this.cocodriles = [];

  this.drawCount = 0;
  this.drawIntervalId = undefined;
  this.addFly();

  this.$playPannel = $('#intro-page');
  this.$scorePannel = $('#page-scores');
  this.$gameoverPannel = $('#page-gameover');
  this.$listScores = $('#scores');
  
  $('#play-box').click(this.onClickPlayBtn.bind(this));
  $('#scores-box').click(this.onClickScoreBtn.bind(this));
  $('#back-box').click(this.onClickBackBtn.bind(this));
  $('#play-again-box').click(this.onClickPlayAgainBtn.bind(this));
  $('#save-box').click(this.onClickSaveSAcorenBtn.bind(this));

  gameAudio = document.getElementById("game-sound");
  gameAudio.controls = false;
} 
// MUSICA DEL JUEGO
Game.prototype.playGameAudio = function() { 
  gameAudio.play(); 
} 

// PANTALLA BEST SCORES
Game.prototype.showBestScores = function () {
  this.bestScores = this.getScore();
  this.liScores = [];
  this.li = "";

  for (prop in this.bestScores) {
    if (this.bestScores.hasOwnProperty(prop)) {
      this.liScores.push({
        "key": prop,
        "value": this.bestScores[prop]
      });
    }
  }

  this.liScores.sort(function(a, b) {
    return b.value - a.value;
  });

  for (var i=0; i < this.liScores.length; i++) {
    this.li = "<li><span class='span-name'>" + this.liScores[i].key + "</span><span class='span-score'>" + this.liScores[i].value + "</span></li>";
    this.$listScores.append(this.li);
    if (i === 9) {
      break;
    }
  }
};

Game.prototype.getScore = function () {
  this.score = localStorage.getItem('score') || '{}';
  return JSON.parse(this.score); 
}

Game.prototype.showScore = function () {
  this.ctx.fillStyle="rgb(59,59,59)";
  this.ctx.font="bold 20px Verdana";
  this.ctx.fillText("Level " + this.fliesEat.length, 20, 35); 
  this.ctx.fillText("Score " + this.fliesEat.length * 100, this.ctx.canvas.width - 140, 35); 
}

Game.prototype.addScore = function (name, value) {
  this.score = this.getScore();
  this.score[name] = value;
  localStorage.setItem('score', JSON.stringify(this.score));
}

// BOTONES DE LOS MENUS
Game.prototype.onClickPlayBtn = function () {
  this.$playPannel.hide();
  this.start();
}

Game.prototype.onClickScoreBtn = function () {
  this.$playPannel.hide();
  this.$scorePannel.show();
  this.showBestScores();
  this.getScore()
}

Game.prototype.onClickBackBtn = function () {
  document.location.reload(); 
}

Game.prototype.onClickPlayAgainBtn = function () {
 document.location.reload();
}

Game.prototype.onClickSaveSAcorenBtn = function () {
  this.score = this.fliesEat.length * 100;
  this.name = document.getElementById("input-name").value;
    if(this.name !== "") {
    this.addScore(this.name, this.score);
    this.$gameoverPannel.hide();
    document.location.reload();
    }  
}

// JUEGO
Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Game.prototype.draw = function() {  
  this.bg.draw();
  this.frog.draw();
  
  this.cars.forEach(function(car) {
    car.draw();
  });
  
  this.trees.forEach(function(tree) {
    tree.draw();
  });

  this.woods.forEach(function(wood) {
    wood.draw();
  });
  
  this.flies.forEach(function(fly) {
    fly.draw();
  });

  this.cocodriles.forEach(function(coco) {
    coco.draw();
  });
   
  this.drawCount++;

  if (this.drawCount % CAR_INTERVAL === 0 ){
    this.addCar();
    this.drawCount = 0; 
  };
}

Game.prototype.start = function() {
  if(!this.isRunning()){

    this.initCar();
    this.playGameAudio();
    this.intervalId = setInterval(function() {
      this.clear();
      this.draw();
      this.move();
      this.showScore();

      if (this.isGameOver() || this.inCocodrile()) { 
        this.gameOver();
      }

      if (this.isCollision()) {
        this.frog.x -= this.frog.vx;
        this.frog.y -= this.frog.vy;
      }

      if (this.eatFly()) {
        this.countFlies();
        this.addFly();
        this.frog.x = 600;
        this.frog.y = 600;
      }

      if (this.inWood()) {
        if(this.frog.x >= this.ctx.canvas.width - this.frog.w || this.frog.x <= 0){
          this.gameOver();
        } else {
            if(this.wood.vx === -WOOD_SPEED){
            this.frog.x = this.wood.x - this.frog.w;
            }
            else{this.frog.x = this.wood.x + this.wood.w}
        } 
      }

      // NIVELES

      if(this.fliesEat.length == 2){
        if(this.trees.length == 0){
          this.addTree();
        } 
      }

      if(this.fliesEat.length == 4){
        if(this.woods.length == 0){
          this.woods.push(this.wood);
          this.cars.push(new Moto(this.ctx));
        } 
      }

      if(this.fliesEat.length == 6){
        if(this.trees.length == 5){
          this.trees = [];
          this.addCocodrile();
          WOOD_SPEED = 8;
          this.cars.push(new Moto2(this.ctx));
        }
      }

      if(this.fliesEat.length == 8){ 
        WOOD_W = 350;
        this.woods[0].w = WOOD_W; 
        COCO_SPEED = 9;   
      }

      if(this.fliesEat.length == 10){
        CAR_SPEED = -8; 
      }

      if(this.fliesEat.length == 11){
        CAR_INTERVAL = 110;
      }

    }.bind(this), DRAW_INTERVAL_MS);
  }
};


Game.prototype.move = function() {
  this.frog.move();

  this.cars = this.cars.filter(function(car) {
    return car.x > -CAR4_X * 2 && car.x < CAR2_X * 2;
  });

  this.cars.forEach(function(car) {
    car.move();
  });

  this.woods.forEach(function(wood) {
    wood.move();
  });

  this.cocodriles.forEach(function(coco) {
    coco.move();
  });
  
};

// PARA SABER SI ESTA EN MARCHA EL JUEGO

Game.prototype.isRunning = function() {
  return this.intervalId !== undefined;
}

// ELIMINAMOS DEL ARRAY DE MOSCAS Y LO AÑADIMOS AL DE MOSCAS COMIDAS

Game.prototype.countFlies = function() {
  var flyPop = this.flies.pop();
  return this.fliesEat.push(flyPop);
}

// PARAMOS EL JUEGO Y MOSTRAMOS EL PANEL DE GAME OVER

Game.prototype.gameOver = function() {
  this.stop();
  if(this.fliesEat.length <= 4){
    document.location.reload();
    this.$playPannel.hide();
    this.start();
  } else {this.$gameoverPannel.show();}
}

// COLISIONES

Game.prototype.isGameOver = function() { 
  return this.cars.some(function(o) {
    return this.frog.collide(o);
  }.bind(this));
}

Game.prototype.isCollision = function() { 
  return this.trees.some(function(o) {
    return this.frog.collide(o);
  }.bind(this));
}

Game.prototype.eatFly = function () {
  return this.flies.some(function(o) {
    return this.frog.collide(o);
  }.bind(this));
}

Game.prototype.inWood = function () {
  return this.woods.some(function(o) {
    return this.frog.collide(o);
  }.bind(this));
}

Game.prototype.inCocodrile = function () {
  return this.cocodriles.some(function(o) {
    return this.frog.collide(o);
  }.bind(this));
}

// STOP

Game.prototype.stop = function () { 
  clearInterval(this.intervalId);
  this.drawIntervalId = undefined;
}

// AÑADIR OBSATCULOS, MOSCAS ETC...

Game.prototype.addCar = function () {
  this.cars.push(new Car1(this.ctx));
  this.cars.push(new Car2(this.ctx));
  this.cars.push(new Car3(this.ctx));
  this.cars.push(new Car4(this.ctx));
}

Game.prototype.initCar = function () {
  this.cars.push(new Car1(this.ctx, 450));
  this.cars.push(new Car2(this.ctx, 800));
  this.cars.push(new Car3(this.ctx, 400));
  this.cars.push(new Car4(this.ctx, 250));
  this.cars.push(new Car1(this.ctx, 1100));
  this.cars.push(new Car2(this.ctx, 1500));
  this.cars.push(new Car3(this.ctx, -150));
  this.cars.push(new Car4(this.ctx, -300));
}

Game.prototype.addTree = function () {
  this.trees.push(new Tree(this.ctx, 100, 280));
  this.trees.push(new Tree(this.ctx, 400, 280));
  this.trees.push(new Tree(this.ctx, 700, 280));
  this.trees.push(new Tree(this.ctx, 1000, 280));
  this.trees.push(new Tree(this.ctx, 1300, 280));
}

Game.prototype.addFly = function () {
  this.flies.push(new Fly(this.ctx, random(200, 1100))) 
}

Game.prototype.addMoto = function () {
  this.cars.push(new Moto(this.ctx)) 
  this.cars.push(new Moto2(this.ctx)) 
}

Game.prototype.addCocodrile = function () {
  this.cocodriles.push(new Cocodrile(this.ctx)) 
  this.cocodriles.push(new Cocodrile2(this.ctx)) 
}



