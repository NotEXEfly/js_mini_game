// РЕСТАРТ ИГРЫ
function RESTART_GAME() {
  console.log("Рестарт игры!")
  // сброс переменных
  RESTART_VARIABEL();
  // сброс GUI
  GUIHealth("show", maxHealth);
  $("#score").text(0);

  $("#end-game-page").css('display', 'none');
  $("#start-page").css('display', 'flex');

  $("#end-game-page .lboard table tbody").html("<tr class='tr-main'><th>Место</th><th>Имя</th><th>Убито</th><th>Счёт</th></tr>");
}

// КОНЕЦ ИГРЫ
function END_GAME(){
  gameEngineStop();
  $("#end-game-page").css('display', 'flex');

  // текущие результаты
  showNowScore();
  //сбор и отправка данных на сервер, подгрузка разультатов
  $.ajax({
		type: "POST",
		url: "../php/score_table.php",
    data: {
      name: Name,
      score: score,
      killed: scrLittle + scrMedium + scrBig
    },
		dataType:"text",
		success: function(data){
      if(typeof data === "string") {
        // раскодируем JSON
        data = jQuery.parseJSON(data);
        // показываем таблицу
        showScoreTabel(data);
      }
      else alert("Ошибка загрузки данных.");
		}
	});
}
