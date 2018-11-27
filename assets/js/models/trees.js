function Tree(ctx, x, y) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/arbol.png";

  this.x = x;
  this.y = y;
  this.w = 70;
  this.h = 70;
}

Tree.prototype.draw = function() {

  this.ctx.drawImage(
    this.img,
    this.x,
    this.y, 
    this.w,
    this.h
  )
};



