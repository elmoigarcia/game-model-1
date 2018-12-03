function Wood(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/wood.png";

  this.x = 0;
  this.y = 11;
  this.w = 220;
  this.h = 40;

  this.vx = WOOD_SPEED;
}

Wood.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};

Wood.prototype.move = function() {
  this.x += this.vx;
  if (this.x >= this.ctx.canvas.width - this.w) {
    this.vx = -WOOD_SPEED;
  }

  if (this.x <= 0) {
    this.vx = WOOD_SPEED;
  }
};

