let ENGINE_STATE = false;
let gameEngine;

//кроссбраузерный вызов метода requestAnimationFrame
let nextGameStep = (function () {
  return requestAnimationFrame  ||
  webkitRequestAnimationFrame   ||
  mozRequestAnimationFrame      ||
  oRequestAnimationFrame        ||
  msRequestAnimationFrame       ||
  function (callback) {
    setTimeout(callback, 1000 / 60);
  };
})();

let setGameEngine = function (callback) {
  gameEngine = callback;
}

// игровой шаг (60 в секунду)
let gameEngineStep = function () {
  if(ENGINE_STATE) {
    gameEngine();
    nextGameStep(gameEngineStep);
    //игровое время каждый цикл
    GAME_TIME++;
  }
}

//начальный запуск, вызывается 1 раз или после паузы
let gameEngineStart = function (callback) {
  ENGINE_STATE = true;
  console.log('Игра запущена!');
  gameEngine = callback;
  gameEngineStep();
}

// пауза
let gameEngineStop = function() {
  console.log('Игра остановленна!');
  ENGINE_STATE = false;
}