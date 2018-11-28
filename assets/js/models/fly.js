function Fly(ctx, x) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/mosca.png";

  this.x = flyRandom();
  this.y = 5;
  this.w = 45;
  this.h = 45;
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