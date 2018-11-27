
function Game(canvasElement) {
  this.ctx = canvasElement.getContext("2d");
  
  this.bg = new Background(this.ctx);
  this.frog = new Frog(this.ctx);
  
  this.cars1 = [];
  this.trees = [];
  this.flies = [];
  this.drawCount = 0;
  this.drawIntervalId = undefined;
  this.fly = Math.floor(Math.random() * this.flies.length);
}

Game.prototype.clear = function () {
  this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Game.prototype.draw = function() {  
  this.bg.draw();
  this.frog.draw();
  this.addTree();
  this.addFly(this.fly);
  
  this.cars1.forEach(function(car) {
    car.draw();
  });
  this.trees.forEach(function(tree) {
    tree.draw();
  });
  this.flies.forEach(function(fly) {
    fly.draw();
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

Game.prototype.addFly = function () {
  this.flies.push(new Fly(this.ctx, 100, 5));
  this.flies.push(new Fly(this.ctx, 400, 5));
  this.flies.push(new Fly(this.ctx, 700, 5));
  this.flies.push(new Fly(this.ctx, 1000, 5));
  
}

