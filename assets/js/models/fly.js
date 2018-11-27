function Fly(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/mosca.png";

  this.x = FLIES_RANDOM;;
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