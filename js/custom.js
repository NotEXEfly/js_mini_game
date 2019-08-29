$(document).ready(function() {

  // -------Стартовый экран-------
  // активация кнопки при прохождении валидации имени
  $("#name").keyup(function(){
    if(checkValideName($("#name").val()))
      $("#start_button").prop("disabled", false);
    else
      $("#start_button").prop("disabled", true);
  });

  // старт игры при нажатии активной кнопки
  $("#start_button").click(function(){
    Name = $("#name").val();
    // проверка на тестера
    if(Name == "tester") {
      test_mod = true;
      // сокрытие жизней и таймера в тест режиме
      $('.health').hide();
      $('.text-timer').hide();
      $('.timer-img').hide();
    }
    // показать имя
    showName();
    // скрыть стартовую страницу
    $("#start-page").hide(100);
    gameEngineStart(gameLoop);
  });

  // рестарт игры
  $("#restart_button").click(function() {
    RESTART_GAME();
  });

  $('.user-name').click(function() {
    window.location.href = "/";
  });
});

function checkValideName(name) {
  let reg = /^[a-zA-Zа-яА-Я1-9]+$/;

  if(name.search(reg) == 0 && name.length > 2) return true;
  else return false;
}
