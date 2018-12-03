
function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  
  this.bg = new Background(this.ctx);
  this.frog = new Frog(this.ctx);
  this.wood = new Wood(this.ctx);
  
  this.cars = [];
  this.trees = [];
  this.flies = [];
  this.fliesEat = [];
  this.woods = [];

  this.drawCount = 0;
  this.drawIntervalId = undefined;
  this.addFly();

}

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

  
   
  this.drawCount++;

  if (this.drawCount % 200 === 0 ){
    this.addCar();
    this.drawCount = 0; 
    
  };
 
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.draw();
    this.move();

    if (this.isGameOver()) { 
      this.stop();
      alert("GAME OVER");
      document.location.reload();
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
        this.stop();
        alert("GAME OVER");
        document.location.reload();
      } else {
          if(this.wood.vx === -WOOD_SPEED){
          this.frog.x = this.wood.x - this.frog.w;
          }
          else{this.frog.x = this.wood.x + this.wood.w}
      } 
    }
    if(this.fliesEat.length == 1){
      if(this.trees.length == 0){
        this.addTree();
      } 
    }
    
    if(this.fliesEat.length == 2){
      if(this.woods.length == 0){
        this.woods.push(this.wood);
      } 
    }
    if(this.fliesEat.length == 3){
      
    }

    
  }.bind(this), DRAW_INTERVAL_MS);
};


Game.prototype.move = function() {
  this.frog.move();

  this.cars = this.cars.filter(function(car) {
    return car.x > -460 && car.x < 1600;
  });

  this.cars.forEach(function(car) {
    car.move();
  });
  this.woods.forEach(function(wood) {
    wood.move();
  });
  
};

Game.prototype.countFlies = function() {
  var flyPop = this.flies.pop();
  return this.fliesEat.push(flyPop);
}

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

Game.prototype.stop = function () { 
  clearInterval(this.intervalId);
  this.drawIntervalId = undefined;
}

Game.prototype.addCar = function () {
  this.cars.push(new Car1(this.ctx));
  this.cars.push(new Car2(this.ctx));
  this.cars.push(new Car3(this.ctx));
  this.cars.push(new Car4(this.ctx));
}

Game.prototype.addTree = function () {
  this.trees.push(new Tree(this.ctx, 100, 280));
  this.trees.push(new Tree(this.ctx, 400, 280));
  this.trees.push(new Tree(this.ctx, 700, 280));
  this.trees.push(new Tree(this.ctx, 1000, 280));
}

Game.prototype.addFly = function () {
  this.flies.push(new Fly(this.ctx, flyRandom(50, 1100))) 
}



