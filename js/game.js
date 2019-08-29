let cnv = document.getElementById('canvas')
let context = cnv.getContext('2d');

let width = 1200, height = 800;
cnv.width = width; cnv.height = height;
cnv.style.backgroundColor = '#eee';
//отключаем сглаживание
context.imageSmoothingEnabled = false;

// отслеживание клика
// --------------------------
let mouseX = 0, mouseY = 0;
let mouseClicked = false;
cnv.onclick = function (event) {
  // если игра не в паузе
  if(ENGINE_STATE) {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    mouseClicked = true;
    // console.log(`x: ${mouseX}   y: ${mouseY}`);
  }
}
// --------------------------

let test_mod = false;
let GAME_TIME = 0;

const TIMER = 90;
let timer_ad = TIMER*60;
// user переменные

const maxHealth = 3;
let health = maxHealth;

let killedInOneCkick = 0;

let scrLittle = 0;
let scrMedium = 0;
let scrBig = 0;

let Name = "";
let score = 0;

// инициализация спрайтов
let drRight = loadSprite('img/enot.png', 27, 29, 91, 4);
let drLeft = loadSprite('img/enot.png', 27, 29, 61, 4);
let drUp = loadSprite('img/enot.png', 24, 29, 30, 4);
let drDown = loadSprite('img/enot.png', 24, 29, 0, 4);
//
let bg = loadSprite('img/earth.png', 960, 720, 0, 0);


// ---враги---
const maxEnemy = 10;
let enemyCount = 0;
let enemyID = 1;
//массив врагов
let enemys = new Array();
//инициализация массива
for(let i = 0; i < maxEnemy; i++) enemys[i] = {};

// размер врагов
const littleEnemySize = 2;
const middleEnemySize = 3;
const largeEnemySize = 4;

// кд респа врагов
let timeRespEnemy = 1;

//счетчик когда был создан последний враг
let timeCounterEnemyLive = 999;

//переменный для передвижения врагов
const boost = 8;
const boostStopOn = 1.5;
const dt = 0.3;
const speedChangeDIrection = 2;

//первичный показ жизней ели не тестовый режим
if(!test_mod)
  GUIHealth("show", maxHealth);

// Главный игровой цикл
let gameLoop = function () {
  playAnimation(drRight, 12);
  playAnimation(drLeft, 12);
  playAnimation(drUp, 12);
  playAnimation(drDown, 12);

  // таймер уменьшаем
  if(!test_mod) {
    timer_ad --;
    timerUpdate();
  }


  //чистим канвас
  context.clearRect(0, 0, cnv.width, cnv.height);
  // timeRespEnemy секунд новый враг
  Actions.spawnEnemy(timeRespEnemy, [littleEnemySize, middleEnemySize, largeEnemySize]);

  // счет времени после появления врага
  timeCounterEnemyLive++;
  //
  // background
  context.drawImage(bg.dom, 0, 0, bg.width, bg.height, 0, 0, cnv.width, cnv.height);
  //
  //отрисовка врагов
  enemys.forEach(enemy => {
    //проверка что враг существеут
    if(enemy.direction) {
      // перемещение обьекта на стартовую позицию если он не на ней
      if(!enemy.onPosition)
        enemy.onPosition = Actions.enemysOnStart(enemy.direction, enemy, enemy.onPosition);

      //передвижение
      enemy.move = goMove(enemy);
      //смена анимации смотря куда идет
      if(enemy.onPosition)
        enemy.direction = enemy.move.myDirection;

      // отрисовка врагов
      enemy.properties = drawAnimation(enemy.direction, enemy.xPos, enemy.yPos, enemy.scale);
      // console.log(enemy.xPos + " " + enemy.yPos);
      // console.log(enemy.properties);
    }

  });

  // проверка не нажал ли игрок на врага
  if(mouseClicked) {
    enemys.forEach(enemy => {

      let prop = enemy.properties;
      if(prop && collisionMouseAndObject(prop)) {
        // console.log("Объект найден, id объекта: " + enemy.id + " scale: " + enemy.scale);
        counterKills(enemy);
        // уничтоженеи объекта
        Actions.destroyEnemy(enemy.id);
        killedInOneCkick ++;
      }

    });
    mouseClicked = false;

    // минус жизнь если никого не убил
    // console.log(killedInOneCkick);
    if(killedInOneCkick == 0) {
      if(!test_mod)
        health--;

      GUIHealth("hide");
    }
    else killedInOneCkick = 0;
  }

  if(enemyCount < 3) timeRespEnemy = 0.5;
  else timeRespEnemy = 1;

  if(timer_ad <= 0) END_GAME();
  if(health == 0) END_GAME();
  // setGameEngine(goRight);
};

function RESTART_VARIABEL() {
  // сбрасывание переменных
  GAME_TIME = 0;
  timer_ad = TIMER*60;
  health = maxHealth;
  killedInOneCkick = 0;
  scrLittle = 0;
  scrMedium = 0;
  scrBig = 0;
  score = 0;
  enemyCount = 0;
  enemyID = 1;
  enemys = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
  timeCounterEnemyLive = 999;
}
