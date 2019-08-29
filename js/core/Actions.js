class Actions {

  static destroyEnemy (id) {
    for(let i = 0; i < enemys.length; i++) {
      if(enemys[i].id == id) {
        enemys[i] = {};
        // console.log(`Объект с id: ${id} уничтожен!`);
        // убрать врага из счётчика
        enemyCount--;
      }
    }
  }

  static createEnemy (startDirection, xPos, yPos, scale) {
    // проверка максимального кол-ва врагов
    if(enemyCount < maxEnemy) {
      for(let i = 0; i < enemys.length; i++) {
        if(!enemys[i].id) {
          enemys[i] = {
            id: enemyID,
            direction: startDirection,
            xPos: xPos,
            yPos: yPos,
            scale: scale,
            properties: {}
          }
          // добавить врага в счётчик
          enemyCount++
          // увеличить id врага
          enemyID++;
          break;
        }     
      }
      // console.log("emptyPlace " + enemyID);
    }
    else {
      console.warn("Максимальное колличество врагов");
    }
  }

  static spawnEnemy (respTime, size) {

    let rndDir;
    let rndSize = 1;
    // чтобы шли не с 1 точки, дает неботльшой расброс
    let rndStartWidthX = 0;
    let rndStartWidthY = 0;

    let dir;
    let spawnX = 0;
    let spawnY = 0;
    
    //  начальная позиция врага
    if(timeCounterEnemyLive/60 >= respTime) {
      rndDir = getRandomInt(1, 5);
      rndSize = getRandomInt(0, 3);

      rndStartWidthX = getRandomInt(-cnv.width/4, cnv.width/4);
      rndStartWidthY = getRandomInt(-cnv.height/4, cnv.height/4);

      if(rndDir == 1) {
        dir = drDown;
        spawnX = cnv.width/2 - drRight.width + rndStartWidthX;
        spawnY = 0 - drRight.height*size[rndSize] - 10;
      }
      else if (rndDir == 2)  
      {
        dir = drLeft;
        spawnX = cnv.width + 10;
        spawnY = cnv.height/2 - drRight.height + rndStartWidthY;
      }
      else if (rndDir == 3)  {
        dir = drUp;
        spawnX = cnv.width/2 - drRight.width + rndStartWidthX;
        spawnY = cnv.height + 10;
      }
      else if (rndDir == 4)  {
        dir = drRight;
        spawnX = 0 - drRight.width*size[rndSize] - 10;
        spawnY = cnv.height/2 - drRight.height + rndStartWidthY;
      }
      //
      this.createEnemy(dir, spawnX, spawnY, size[rndSize]);
      
      // console.log("Враг создан!");
      timeCounterEnemyLive = 0;
    }
    
    
  }
//Прикрутить эту функцию!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // стартовая позиция врага
  static enemysOnStart(outDir, enemy) {
      //1-up 2-right 3-down 4-left

      if(outDir === drUp) {
        // console.log(1);
        if(enemy.yPos >= height - height/3)  {
          enemy.yPos -= 3;
          return false;
        }
        else {
          return true;
        }
      }
      if(outDir === drRight) {
        if(enemy.xPos <= width/3) {
          enemy.xPos += 3;
          return false;
        }
        else return true;
      }
      if(outDir === drDown) {
        if(enemy.yPos <= height/3) {
          enemy.yPos += 3;
          return false;
        }
        else return true;
      }
      if(outDir === drLeft) {
        if(enemy.xPos >= width - width/3) {
          enemy.xPos -= 3;
          return false;
        }
        else return true;
      }
    
  }
}