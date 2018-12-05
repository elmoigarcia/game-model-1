function Frog(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/frogss1.png";
  
  this.img.frames = 3;
  this.img.frameIndex = 2;
  this.img.rows = 9;
  this.currentIndex = 2;
  this.cutY = 0;

  this.x = 600;
  this.y = 600;
  this.w = 55;
  this.h = 55;

  this.vx = 0;
  this.vy = 0;

  this.y0 = this.y;

  this.drawCount = 0; //contador de los frames

  this.setListeners();
}

Frog.prototype.draw = function() {

this.drawCount++;

  this.ctx.drawImage(
    this.img,
    this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
    this.img.height * this.cutY / this.img.rows,
    this.img.width/ this.img.frames,
    this.img.height / this.img.rows,
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
Frog.prototype.setListeners = function () {
  document.onkeyup = this.onKeyUp.bind(this);
  document.onkeydown = this.onKeyDown.bind(this);
}

Frog.prototype.move = function() {
 
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= FRICTION;
  this.vy *= FRICTION;

  if (this.y >= this.ctx.canvas.height - this.h) {
    this.vy = 0;
    this.y = this.ctx.canvas.height - this.h;
  }

  if (this.x >= this.ctx.canvas.width - this.w) {
    this.vx = 0;
    this.x = this.ctx.canvas.width - this.w;
  }

  if (this.x <= 0) {
    this.x = 0;
    this.vx = 0;
  }

  if (this.y <= 0) {
    this.y = 0;
    this.vy = 0;
  }
};



Frog.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {

    case KEY_UP:
      this.vy = -FROG_SPEED;
      this.cutY = 3;
      break;
    case KEY_RIGHT:
      this.vx = FROG_SPEED;
      this.cutY = 2;
      break;
    case KEY_DOWN:
      this.vy = FROG_SPEED;
      this.cutY = 0;
      break;
    case KEY_LEFT:
      this.vx = -FROG_SPEED;
      this.cutY = 1;
      break;
  }
};

Frog.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
      this.vx = 0;
      this.cutY = 6;
    break;
    case KEY_LEFT:
      this.vx = 0;
      this.cutY = 5;
    break;
    case KEY_UP:
      this.vy = 0;
      this.cutY = 7;
    break;
    case KEY_DOWN:
      this.vy = 0;
      this.cutY = 4;
    break;
  }
};

Frog.prototype.animate = function() {
  if (++this.img.frameIndex  > this.currentIndex) {
    this.img.frameIndex = this.currentIndex - 1;
  }
}

Frog.prototype.collide = function(o) { //para saber cuando colisiona
  var colX = this.x + this.w/1.4 > o.x && this.x + this.w < o.x + o.w + this.w/1.4;
  var colY = this.y + this.h/1.4 > o.y && this.y + this.h < o.y + o.h + this.h/1.4;
 
  return colX && colY;
}

Frog.prototype.kill = function () {
  this.cutY = 8;
  // this.img.onload = function() {
  //   this.draw();
  // }.bind(this)
}
