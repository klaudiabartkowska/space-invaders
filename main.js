let spaceship = document.getElementById("spaceship");

const spaceshipVelocity = 15; // it's an int

let container = document.getElementById("container");
let spaceshipDiv = document.querySelector(".spaceshipDiv");
container.append(spaceshipDiv);

let playArea = container.getBoundingClientRect().width / 2;

let middleOfSpaceShip = spaceship.getBoundingClientRect().width / 2;

let limit = container.getBoundingClientRect().width * 0.2;

let bulletStart = spaceship.getBoundingClientRect().height + 45;
let bulletVelocity = bulletStart;
let started = false;
let pause = false;
let restart = false;
let shootPressed = false;
let key;
let move = { left: 0, right: 0, shoot: 0 };

let aliens = Array.from(document.querySelectorAll(".aliens")); // all the aliens

const enemy = document.getElementById("enemy");
let gameOver = false;
let position = 0;
let down = 40;
let direction = true;
let curentY = 0;
let canFire = true;
// enemy.style.transform = container.getBoundingClientRect().x + 'px'
// console.log(aliens[1]); // use for remove index

window.addEventListener("load", () => {
  spaceship.style.position = "absolute";
  spaceship.style.left = playArea - middleOfSpaceShip + "px"; // center the Spaceship
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

document.addEventListener("keydown", (e) => {
  key = e.key;

  if (key === "Enter") {
    started = true;
    console.log(started);
  } else if (key === "p") {
    pause = true;
    console.log(pause);
  } else if (key === "r") {
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

function animateEnemy() {
  position += 4;

  if (enemy.getBoundingClientRect().right < container.getBoundingClientRect().right && direction) {
    enemy.style.transform = `translate(${position}px, ${curentY}px)`;
  } else {
    if (direction === true) {
      curentY += 30;
      console.log("curentY", curentY);
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = false;
    }
    position -= 8;
    enemy.style.transform = `translate(${position}px, ${curentY}px)`;
    if (position < 4) {
      curentY += 30;
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = true;
    }
  }
  if ( enemy.getBoundingClientRect().bottom >= spaceship.getBoundingClientRect().top) {
    gameOver = true;
  }
}

function movePlayer() {
  if (move.left === 1) {
    if (spaceship.getBoundingClientRect().left > container.getBoundingClientRect().left) {
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
  if (move.shoot && canFire) {
    canFire = false;
    shootPressed = true;
    let bullet = document.createElement("IMG");

    bullet.src = "./img/bullet.png";

    bullet.setAttribute("id", "laser");
    const body = document.querySelector("body");
    body.append(bullet);

    const bulletY = spaceship.getBoundingClientRect().top - 13 + "px";
    const bulletX = (spaceship.getBoundingClientRect().right + spaceship.getBoundingClientRect().left) /2 - 13 + "px";

    bullet.style.bottom = bulletStart + "px";
    bullet.style.left = bulletX;
  }

  let bullet = document.getElementById("laser");

  if (bullet != null) {
    bullet.style.bottom = bulletVelocity + "px";
    bulletVelocity += 20;
    if (bulletVelocity - spaceship.getBoundingClientRect().height / 2 >= container.getBoundingClientRect().height) {
      bulletVelocity = bulletStart;
      bullet.remove();
      canFire = true;
    }
  }
}

function collisonDetection(){

}

function gameLoop() {
  if (started === true) {
    if (gameOver === false) {
      animateEnemy();
      movePlayer();
      shoot();
    }
  }
  requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
