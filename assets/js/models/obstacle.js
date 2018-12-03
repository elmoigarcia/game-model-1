function Car1(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car.png";

  this.x = this.ctx.canvas.width;
  this.y = 450;
  this.w = 180;
  this.h = 90;

  this.vx = -3;
}

Car1.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Car1.prototype.move = function() {
  this.x += this.vx;

};


function Car2(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car5.png";

  this.x = this.ctx.canvas.width + 300;
  this.y = 350;
  this.w = 180;
  this.h = 90;

  this.vx = -3;

}

Car2.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};



Car2.prototype.move = function() {
  this.x += this.vx;

};
function Car3(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car3.png";

  this.x = -200;
  this.y = 80;
  this.w = 180;
  this.h = 90;

  this.vx = -3;
}

Car3.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Car3.prototype.move = function() {
  this.x -= this.vx;
};


function Car4(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car4.png";

  this.x = -450;
  this.y = 190;
  this.w = 180;
  this.h = 90;

  this.vx = -3;
}

Car4.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Car4.prototype.move = function() {
  this.x -= this.vx;
};




