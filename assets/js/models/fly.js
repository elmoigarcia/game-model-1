function Fly(ctx, x, y) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/mosca.png";

  this.x = x;
  this.y = y;
  this.w = 50;
  this.h = 50;
}

Fly.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};