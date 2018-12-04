
var DRAW_INTERVAL_MS = 1000 / 60;

var KEY_UP = 38;
var KEY_RIGHT = 39;
var KEY_DOWN = 40;
var KEY_LEFT = 37;

var FRICTION = 1;
var FROG_SPEED = 6;
var CAR_SPEED = -3;
var WOOD_SPEED = 4;

var WOOD_W = 220;

var CAR_INTERVAL = 200;

var CAR4_X = 400;
var CAR2_X = 1550;


function flyRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

