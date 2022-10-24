let spaceship = document.getElementById("spaceship");

const spaceshipVelocity = 15; // it's an int

let container = document.getElementById("container");
let spaceshipDiv = document.querySelector(".spaceshipDiv");
container.append(spaceshipDiv);

let playArea = container.getBoundingClientRect().width / 2;

let middleOfSpaceShip = spaceship.getBoundingClientRect().width / 2;

let bulletStart = spaceship.getBoundingClientRect().height + 45;

let bulletVelocity = bulletStart;

let started = false;

let pause = false;

let restart = false;

let shootPressed = false;

let destroyed = false; 

let key;

let score = 0;

let move = {left:  0,
            right: 0, 
            shoot: 0 };

let aliens = Array.from(document.querySelectorAll(".aliens")); // all the aliens

const enemy = document.getElementById("enemy");

let gameOver = false;

let position = 0;

let direction = true;

let curentY = 0;

let canFire = true;
// enemy.style.transform = container.getBoundingClientRect().x + 'px'


window.addEventListener("load", () => {
  spaceship.style.position = "absolute";
  spaceship.style.left = playArea - middleOfSpaceShip + "px"; // center the Spaceship
});

document.addEventListener("keydown", (e) => {
  key = e.key;
  if (key === "Enter") {
    started = true;
    console.log(started);
  } else if (key === "p") {
    pause = true;
    console.log(pause);
  } else if (key === "r") {
    document.location.reload()
    restart = true;
  } else if (key === "ArrowLeft") {
    move.left = 1;
    movePlayer();
  } else if (key === "ArrowRight") {
    move.right = 1;
    movePlayer();
  } else if (key === " ") {
    move.shoot = 1;
    shoot();
  }
});

document.addEventListener("keyup", (e) => {
  key = e.key;

  if (key === "ArrowLeft") {
    move.left = 0;
  } else if (key === "ArrowRight") {
    move.right = 0;
  } else if (key === " ") {
    move.shoot = 0;
  }
  key = "";
});



function animateEnemy() {
  position += 4;

  if (enemy.getBoundingClientRect().right < container.getBoundingClientRect().right && direction) {
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
  } else{
      if (direction === true){
      curentY += 40;
      // console.log("curentY", curentY);
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = false;
    }
    position -= 8;
    enemy.style.transform = `translate(${position}px, ${curentY}px)`;
    if (position < 4) {
      curentY += 40;
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = true;
    }
  }
  if (enemy.getBoundingClientRect().bottom >= spaceship.getBoundingClientRect().top){
     gameOver = true;
  }
}

function movePlayer(){
  if (move.left === 1){
    if (spaceship.getBoundingClientRect().left >container.getBoundingClientRect().left){
      spaceship.style.left = parseInt(spaceship.style.left) - spaceshipVelocity + "px";
    }
  }
  if (move.right === 1) {
    if (spaceship.getBoundingClientRect().right < container.getBoundingClientRect().right) {
      spaceship.style.left = parseInt(spaceship.style.left) + spaceshipVelocity + "px";
    }
  }
}

function shoot() {
  if(move.shoot && canFire){
    canFire = false;
    shootPressed = true;

    let bullet = document.createElement("IMG");
    bullet.src = "./img/bullet.png";
    bullet.setAttribute("id", "laser");
    const body = document.querySelector("body");
    body.append(bullet);

    const bulletY = spaceship.getBoundingClientRect().top-13 + "px";
    const bulletX =(spaceship.getBoundingClientRect().right + spaceship.getBoundingClientRect().left)/2-13 +"px";

    bullet.style.bottom = bulletStart + "px";
    bullet.style.left = bulletX;
  }

  let bullet = document.getElementById("laser");

  if (bullet != null){
    bullet.style.bottom = bulletVelocity + "px";
    bulletVelocity += 20;
  if (bulletVelocity - spaceship.getBoundingClientRect().height / 2 >= container.getBoundingClientRect().height){
      bulletVelocity = bulletStart;
      bullet.remove();
      canFire = true;
    }
  }
}

function collisonDetection(){

  let bullet = document.getElementById("laser")
  let aliens = Array.from(document.querySelectorAll(".aliens")); 
  // aliens[i].getBoundingClientRect().x   // getBoundingClient works for each element of the array 


  
if (bullet != null){
  for(i = 0; i < aliens.length; i++){
   // horizontal check ---  (alien.x < bullet.x + bullet.y  && alien.x + alien.width > bullet.x)
   if (aliens[i].getBoundingClientRect().x <( bullet.getBoundingClientRect().x + bullet.getBoundingClientRect().width) && (aliens[i].getBoundingClientRect().x + aliens[i].getBoundingClientRect().width) > bullet.getBoundingClientRect().x){ 
     // vertical check  --- (alien.y < bullet.y + bullet.height && alien.y + allien.height > bullet.y)
     if (aliens[i].getBoundingClientRect().y < bullet.getBoundingClientRect().y + bullet.getBoundingClientRect().height && aliens[i].getBoundingClientRect().y + aliens[i].getBoundingClientRect().height > bullet.getBoundingClientRect().y){
       if(aliens[i].className !== "dead"){
      //  console.log(i,aliens[i],aliens[i].className === "dead");
       aliens[i].className = "dead"
      // remove bullet so it doesn't go throught the next row of aliens  
       bullet.remove()
       //reposition the bullet to it's starting point  
       bulletVelocity=bulletStart
       canFire = true; 
       score += 5
       document.getElementById('score').innerHTML = score
  }
    }
  }
}
}
}


  
function gameLoop() {
  if (started === true) {
    if (gameOver === false) {
      animateEnemy();
      movePlayer();
      shoot();
      collisonDetection(); 
    }
  }
  requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
