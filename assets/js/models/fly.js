function Fly(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/mosca.png";

  this.x = x ;
  this.y = 20;
  this.w = 30;
  this.h = 30;
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