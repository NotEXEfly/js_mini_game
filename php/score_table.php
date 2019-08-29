<?php
  require_once 'DataBase.php'; // подключаем настройки бд
  // получаем данные с игры
  $user_name = $_POST['name'];
  $user_score = $_POST['score'];
  $user_killed = $_POST['killed'];

  // подключаемся к серверу
  $db = DataBase::Connect();
  
  // если такого пользователя нет
  if(empty($db->query("SELECT `name` FROM `scoreboard` WHERE `name` = '$user_name'")->fetch())) {
    $db->query("INSERT INTO `scoreboard` (`name`,`killed`,`score`) VALUES ('$user_name','$user_killed','$user_score')");
  }
  // если пользователь есть сравниваем старые и новые очки
  else {
    $old_score = $db->query("SELECT `score` FROM `scoreboard` WHERE `name` = '$user_name'")->fetch();
    $old_score = $old_score['score'];
    // обновляем очки если новые больше
    if($old_score < $user_score) {
      $db->query("UPDATE `scoreboard` SET `killed` = '$user_killed', `score` = '$user_score' WHERE `name` = '$user_name'");
    }
  }


  // получаем всех пользоваетелй
  $allUsers = $db->query("SELECT `name`,`killed`,`score` FROM `scoreboard` ORDER BY `score` DESC")->fetchAll();

  // узнаём место игрока
  $place = get_user($user_name, $allUsers)['place'];
  // выводит если входит в 10 лучших
  if($place < 10) {
    $endArr = array();
    for($i = 0; $i < 10; $i++) {
      $endArr[] = $allUsers[$i];
    }

    $endArr = json_encode($endArr);
    echo($endArr);
  }
  else {
    $endArr = array();

    for($i = 0; $i < 9; $i++) {
      $endArr[] = $allUsers[$i];
    }

    // ставим 10 если ниже
    $endArr[] = get_user($user_name, $allUsers)['user'];
    $endArr[] = ['last_place' => get_user($user_name, $allUsers)['place']];

    $endArr = json_encode($endArr);
    echo($endArr);
  }

  function get_user($user_name, $allUsers) {
    $place = 0;
    $user;
    foreach ($allUsers as $row) {
      if($row['name'] == $user_name) {
        $user = $row;
        break;
      }
      $place++;
    }

    $user_res['place'] = $place;
    $user_res['user'] = $user;
    return $user_res;
  }
?>