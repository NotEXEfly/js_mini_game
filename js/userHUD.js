// счет убитых врагов
function counterKills(enemy) {
  if(enemy.scale == littleEnemySize) {
    scrLittle ++;
    score += 30;
  }
  else if(enemy.scale == middleEnemySize) {
    scrMedium ++;
    score += 20;
  }
  else if(enemy.scale == largeEnemySize) {
    scrBig ++;
    score += 10;
  }

  // отображение счета
  $("#score").text(score);
}
// ------------------------------
// пауза
function pauseThisGame() {
  $(".pause").toggleClass('active');
  if(!$(".pause").hasClass("active")) {
    gameEngineStop();
  }
  else gameEngineStart(gameLoop);
}

// пауза при нажатии кнопки паузы
$(".pause").click(function(){
  let btn = $(".pause");
  if(btn.hasClass('active')) btn.text("play").css({"font-size": "24px", "line-height": "2"});
  else btn.text("II").css({"font-size": "40px", "line-height": "1.2"});

  pauseThisGame();
});

//пауза пробелом
$("body").keydown(function(e) {
  if(e.keyCode === 32) {
    let btn = $(".pause");
    if(btn.hasClass('active')) btn.text("play").css({"font-size": "24px", "line-height": "2"});
  else btn.text("II").css({"font-size": "40px", "line-height": "1.2"});

    pauseThisGame();
  }
});
// ------------------------------

// таймер
function timerUpdate() {
  let minets = Math.floor(timer_ad/60/60);
  let seconds = Math.floor(timer_ad/60) - minets*60;

  // добавление 0 если не хватает
  if(Math.floor(minets/10) == 0) minets = "0" + minets;
  if(Math.floor(seconds/10) == 0) seconds = "0" + seconds;

  let str = "";
  let time = `${minets}:${seconds}`;
  $(".text-timer").text(time);
}

// Жизни
function GUIHealth(option, value) {
  let parrent = $(".health")
  if(option === "hide") {
    parrent.children().eq(0).remove();
  }
  else if(option === "show") {
    parrent.empty();
    for(let i = 0; i < value; i++) {
      parrent.append("<img src=\"img/heart_icon.png\" alt=\"heart\">");
    }
  }
}

// Таблица лидеров
function showScoreTabel(data) {
  let table = $("#end-game-page .lboard table");
  let str = "";
  let itsMe = "";
  let i = 1;

  if(data != null) {

    // если возращается 10 результатов то просто выводим
    if(data.length == 10)
    {
      for(let i = 0; i < 10; i++){
        // если имя совпадает делаем дывеление
        itsMe = (data[i].name === Name) ? " class='itsMe'" : "";

        str+=`<tr${itsMe}><td>${i+1}</td><td>${data[i].name}</td><td>${data[i].killed}</td><td>${data[i].score}</td></tr>`;
      }
    }
    else {
      // пребираем первые 9ть
      for(let i = 0; i < 9; i++){
        // если имя совпадает делаем дывеление
        itsMe = (data[i].name == Name) ? " class='itsMe'" : "";

        str+=`<tr${itsMe}><td>${i+1}</td><td>${data[i].name}</td><td>${data[i].killed}</td><td>${data[i].score}</td></tr>`;
      }
      // формируем 10ый
      itsMe = (data[data.length - 2].name === Name) ? " class='itsMe'" : "";
      i = data[data.length - 1].last_place;
      str+=`<tr${itsMe}><td>${i}</td><td>${data[data.length - 2].name}</td><td>${data[data.length - 2].killed}</td><td>${data[data.length - 2].score}</td></tr>`;
    }

  }

  table.append(str);
}

// текущий результат
function showNowScore() {
  let name = $("#end-game-page #newNameb");
  let killed = $("#end-game-page #newKilledb");
  let scr = $("#end-game-page #newScoreb");
  name.text(Name);
  killed.text(scrLittle + scrMedium + scrBig);
  scr.text(score);

}

// показать имя в обычном режиме и "Тестовый режим" в тестовом
function showName () {
  if(Name === "tester") $('.user-name').text('Тестовый режим').css('color', 'red');
  else $('.user-name').text(Name);
}
