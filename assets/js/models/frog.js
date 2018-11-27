function Frog(ctx) {
  this.ctx = ctx;
  this.img = new Image();
  this.img.src = "./img/frogreposoup.png";
  
  this.img.frames = 1;
  this.img.frameIndex = 0;

  this.x = 600;
  this.y = 600;
  this.w = 40;
  this.h = 40;

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
    //this.animate ();
  }

};
Frog.prototype.setListeners = function () {
  document.onkeyup = this.onKeyUp.bind(this);
  document.onkeydown = this.onKeyDown.bind(this);
}

Frog.prototype.move = function() {
  this.y += this.vy;
  this.x += this.vx;

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

// Frog.prototype.animate = function() { 
//   if (++this.img.frameIndex > 2){
//     this.img.frameIndex = 1;
//   }  
// };


Frog.prototype.onKeyDown = function(event) {
  switch (event.keyCode) {

    case KEY_UP:
      this.vy = -10;
      break;
    case KEY_RIGHT:
      this.vx = 10;
      break;
    case KEY_DOWN:
      this.vy = 10;
      break;
    case KEY_LEFT:
      this.vx = -10;
      break;
  }
};

Frog.prototype.onKeyUp = function(event) {
  switch (event.keyCode) {
    case KEY_RIGHT:
    case KEY_LEFT:
      this.vx = 0;
    break;
    case KEY_UP:
    case KEY_DOWN:
      this.vy = 0;
    break;
  }
};

Frog.prototype.collideWith = function(o) { //para saber cuando colisiona
  var colX = this.x + this.w/1.2 > o.x && this.x + this.w < o.x + o.w + this.w;
  var colY = this.y + this.h/1.2 > o.y && this.y + this.h < o.y + o.h + this.h;
 
  return colX && colY;
}

Frog.prototype.collideNoAdvance = function(t) { //para saber cuando colisiona
  var colX = this.x + this.w/1.2 > t.x && this.x + this.w < t.x + t.w + this.w;
  var colY = this.y + this.h/1.2 > t.y && this.y + this.h < t.y + t.h + this.h;
 
  return colX && colY;
}