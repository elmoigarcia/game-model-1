function Cocodrile(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/cocodrile.png";

  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.x = 0;
  this.y = 300;
  this.w = 200;
  this.h = 50;

  this.vx = COCO_SPEED;

  this.drawCount = 0
}

Cocodrile.prototype.draw = function() {

  this.drawCount++;

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    this.img.width/ this.img.frames,
    this.img.height,
    this.x,
    this.y, 
    this.w,
    this.h
  )

  if (this.drawCount % 10 === 0 ){
    this.drawCount = 0 ; 
    this.animate();
  }
};

Cocodrile.prototype.animate = function() { 

  if (++this.img.frameIndex > 2){
    this.img.frameIndex = 0;
  }  
};

Cocodrile.prototype.move = function() {
  this.x += this.vx;
  if (this.x >= this.ctx.canvas.width/2 - this.w) {
    this.vx = -4;
    this.img.src = "./img/cocodrile2.png";
  }

  if (this.x <= 0) {
    this.vx = 4;
    this.img.src = "./img/cocodrile.png";
  }
};

function Cocodrile2(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/cocodrile2.png";

  this.img.frames = 3;
  this.img.frameIndex = 0;

  this.w = 200;
  this.x = this.ctx.canvas.width - this.w ;
  this.y = 300;
  this.h = 50;

  this.vx = WOOD_SPEED;

  this.drawCount = 0
}

Cocodrile2.prototype.draw = function() {

  this.drawCount++;

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    0,
    this.img.width/ this.img.frames,
    this.img.height,
    this.x,
    this.y, 
    this.w,
    this.h
  )

  if (this.drawCount % 10 === 0 ){
    this.drawCount = 0 ; 
    this.animate();
  }
};

Cocodrile2.prototype.animate = function() { 

  if (++this.img.frameIndex > 2){
    this.img.frameIndex = 0;
  }  
};

Cocodrile2.prototype.move = function() {
  this.x -= this.vx;
  if (this.x <= this.ctx.canvas.width/2) {
    this.vx = -4;
    this.img.src = "./img/cocodrile.png";
  }

  if (this.x >= this.ctx.canvas.width - this.w) {
    this.vx = 4;
    this.img.src = "./img/cocodrile2.png";
  }
};


 