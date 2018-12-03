
var DRAW_INTERVAL_MS = 1000 / 60;

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;

var FRICTION = 0.9;
var FROG_SPEED = 7;
var CAR_FAST = -2;
var WOOD_SPEED = 4;


function flyRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

