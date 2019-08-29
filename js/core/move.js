function goMove(enemy) {
  //инициальзация переменных
  let time_old = 0;
  let TIME_DONE = false;
  let myDirection = drDown;	
  let a = {x: 0, y: 0};
  let v = {x: 0, y: 0};
  if(enemy.move) {
    ax = enemy.move.a.x;
    ay = enemy.move.a.y;
    vx = enemy.move.v.x;
    vy = enemy.move.v.y;

    time_old = enemy.move.time_old;
    TIME_DONE = enemy.move.TIME_DONE;
    myDirection = enemy.move.myDirection;	
    a = {x: ax, y: ay};
    v = {x: vx, y: vy};
  }

  for(let i = 0; i < enemys.length; i++) {
    if(enemys[i].id == enemy.id && enemys[i].onPosition) {
      //если долго задержался на поле не тормозим boost ускорение
      if(GAME_TIME % 60 == 0) time_old ++;

      a.x = getRandomFloat(-speedChangeDIrection, speedChangeDIrection) / Math.sqrt(dt);
      a.y = getRandomFloat(-speedChangeDIrection, speedChangeDIrection) / Math.sqrt(dt);
      v.x += a.x * dt;
      v.y += a.y * dt
      enemy.xPos += v.x * dt;
      enemy.yPos += v.y * dt;

      //когда выход за пределы destroy
      if(enemys[i].xPos > cnv.width                                               ||
        enemys[i].xPos < 0 - enemys[i].direction.width*enemys[i].scale            ||
        enemys[i].yPos > cnv.height                                               ||
        enemys[i].yPos < 0 - enemys[i].direction.height*enemys[i].scale ) 
      {
        //время жизни врага
        // console.log(time_old);
        Actions.destroyEnemy(enemys[i].id);
        // gameEngineStop();
      }//objDestroy


      // если слишком больщое ускорение то оно сбрасывается
      if(!TIME_DONE && (time_old<10)){
        if(v.x > boost || v.x < -boost || v.y > boost || v.y < -boost) {
          v.x = v.x/boostStopOn; v.y = v.x/boostStopOn;
        }
      }
      // else console.log("boost");

      // определение направления каждую секунду
      if(GAME_TIME % 40 == 0) {
        myDirection = directionNow(v.x, v.y);
      }
    }
  }

  return {
    time_old: time_old,
    TIME_DONE: TIME_DONE,
    myDirection: myDirection,
    a: a,
    v: v,
  }
}

//проверка на максимальное ускорение для опеределения направления
function directionNow(directionX, directionY) {
  if(Math.abs(directionX) > Math.abs(directionY)) {
    if(directionX > 0) return drRight;
    else return drLeft;
  }
  else {
    if(directionY > 0) return drDown;
    else return drUp;
  }
}