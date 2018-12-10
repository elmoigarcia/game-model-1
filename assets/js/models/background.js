function Background(ctx) {
  this.ctx = ctx;
  this.x = 0;
  this.y = 0;

  this.w = ctx.canvas.width;
  this.h = ctx.canvas.height;
  this.img = new Image();
  this.img.src = "./img/road.jpg";
}

Background.prototype.draw = function() {
  this.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.w,
      this.h
  );
};
