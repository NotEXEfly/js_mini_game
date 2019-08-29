//создание обьекта картинки
function loadSprite(path, width, height, getFromY, count){
  let image = document.createElement('img');

  let result = {
    dom: image,
    width: width,
    height: height,
    getFromY: getFromY,
    count: count,
    loaded : false,
    num: 1
  };

  image.onload = function() {
    result.loaded = true;   
    console.log(path + " loaded!");   
  }
  image.src = path;

  return result;
}

//отрисовка изображения
function drawAnimation(img, x, y, scale) {
  if(!img.loaded) return;
  
  // 2,3,4,5 параметры - откуда берём изображение
  // 6,7,8,9 параметры - куда рисуем изображение
  context.drawImage(img.dom, img.width*(img.num-1), img.getFromY, img.width, img.height, x, y, img.width*scale, img.height*scale);

  return { 
    posX: x, 
    posY: y, 
    imgW: img.width  * scale, 
    imgH: img.height * scale
  };
}

// проигрывание анимации
function playAnimation(anim, speedAnimation = 10) {
  if(GAME_TIME % speedAnimation == 0){
    if(anim.num >= anim.count) {
      anim.num = 1;
      // console.log(anim.num);
    }
    else {
      anim.num++;
      // console.log(anim.num);
    }
  }
}