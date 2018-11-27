
function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  
  this.bg = new Background(this.ctx);
  this.frog = new Frog(this.ctx);
  this.fly = new Fly(this.ctx);
  

  this.cars1 = [];
  this.trees = [];
  this.flies = [];
  console.log(this.flies)
  this.drawCount = 0;
  this.drawIntervalId = undefined;
  
  this.flies.push(this.fly);
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Game.prototype.draw = function() {  
  this.bg.draw();
  this.frog.draw();
  this.fly.draw();
  this.addTree();
  
  
  this.cars1.forEach(function(car) {
    car.draw();
  });
  this.trees.forEach(function(tree) {
    tree.draw();
  });
  
   
  this.drawCount++;

  if (this.drawCount % 200 === 0 ){
    this.addCar();
    this.drawCount = 0; 
  }
}

Game.prototype.start = function() {
  this.intervalId = setInterval(function() {
    this.clear();
    this.draw();
    this.move();

    if (this.isGameOver()) { 
      this.stop();
      alert("GAME OVER");
    }

    if (this.isCollision()) {
      this.frog.x -= this.frog.vx;
      this.frog.y -= this.frog.vy;
    }

    if (this.eatFly()) {
      this.frog.x = 600;
      this.frog.y = 600;
      this.clear();
      this.draw();
      console.log(this.flies)
    }

  }.bind(this), DRAW_INTERVAL_MS);
};


Game.prototype.move = function(action) {
  this.frog.move();

  this.cars1.forEach(function(car) {
    car.move();
  });
  this.cars1 = this.cars1.filter(function(car) {
    return car.x > -460;
  });
  
};

Game.prototype.isGameOver = function() { 
  return this.cars1.some(function(o) {
    return this.frog.collideWith(o);
  }.bind(this));
}

Game.prototype.isCollision = function() { 
  return this.trees.some(function(t) {
    return this.frog.collideNoAdvance(t);
  }.bind(this));
}

Game.prototype.stop = function () { 
  clearInterval(this.intervalId);
  this.drawIntervalId = undefined;
}

Game.prototype.eatFly = function () {
  return this.flies.some(function(f) {
    return this.frog.collideEatFly(f);
  }.bind(this));
}

Game.prototype.addCar = function () {
  this.cars1.push(new Car1(this.ctx));
  this.cars1.push(new Car2(this.ctx));
  this.cars1.push(new Car3(this.ctx));
  this.cars1.push(new Car4(this.ctx));
  this.cars1.push(new Car5(this.ctx));
  this.cars1.push(new Car6(this.ctx));
}

Game.prototype.addTree = function () {
  this.trees.push(new Tree(this.ctx, 100, 280));
  this.trees.push(new Tree(this.ctx, 400, 280));
  this.trees.push(new Tree(this.ctx, 700, 280));
  this.trees.push(new Tree(this.ctx, 1000, 280));
}

// Game.prototype.addFly = function () {
//   this.flies.push(new Fly(this.ctx));  
// }

