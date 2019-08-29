//проверка не нажал ли игрок на объект
function collisionMouseAndObject(obj) {
  
  if((mouseX >= obj.posX && mouseX <= obj.posX + obj.imgW) && (mouseY >= obj.posY && mouseY <= obj.posY + obj.imgH)){
    if(!mouseClicked) {
      mouseY = -9999;
      mouseX = -9999;
    } 
    // console.log(`x: ${mouseX}   y: ${mouseY}`);
    return true;
  }   
  else {
    if(!mouseClicked) {
      mouseY = -9999;
      mouseX = -9999;
    } 
    return false;
  }
}

// рандомы
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
// случайное число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}