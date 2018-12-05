
window.onload = function() {
  var canvas = document.getElementById('my-canvas')
  var game = new Game(canvas);
  game.start();
};



// document.addEventListener('DOMContentLoaded', function() {
//   var score = getScore();
//   console.log(score);
// });

// function getScore() {
//   var score = localStorage.getItem('score') || '{}';
//   return JSON.parse(score);
// }

// function addScore(name, value) {
//   var score = getScore();

//   score[name] = value;

//   localStorage.setItem('score', JSON.stringify(score));
// }


// // 