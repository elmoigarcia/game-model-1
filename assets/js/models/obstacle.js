function Car1(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car.png";

  this.x =  x || this.ctx.canvas.width;
  this.y = 450;
  this.w = 180;
  this.h = 90;

  this.vx = CAR_SPEED;
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


function Car2(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car5.png";

  this.w = 180;
  this.h = 90;
  this.x =  x || CAR2_X;
  this.y = 350;
  

  this.vx = CAR_SPEED;

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
function Car3(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car3.png";

  this.w = 180;
  this.h = 90;
  this.x =  x || -this.w;
  this.y = 80;
  

  this.vx = CAR_SPEED;
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


function Car4(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/car4.png";

  this.w = 180;
  this.h = 90;
  this.x = x || -CAR4_X;
  this.y = 190;
  

  this.vx = CAR_SPEED;
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

function Moto(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/moto.png";

  this.x = this.ctx.canvas.width;
  this.y = 490;
  this.w = 180;
  this.h = 90;

  this.vx = 10;
}

Moto.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Moto.prototype.move = function() {
  this.x -= this.vx;

};

function Moto2(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/moto2.png";

  this.w = 180;
  this.h = 90;
  this.x = -this.w;
  this.y = 490;
  

  this.vx = 8;
}

Moto2.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Moto2.prototype.move = function() {
  this.x += this.vx;
};





