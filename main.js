
//      CONTAINER
let container = document.getElementById("container");
let playArea = container.getBoundingClientRect().width / 2;
let instruction = document.getElementById('instruction')




//      SPACESHIP 
let spaceship = document.getElementById("spaceship");
const spaceshipVelocity = 15; // it's an int
let spaceshipDiv = document.querySelector(".spaceshipDiv");
container.append(spaceshipDiv);
let middleOfSpaceShip = spaceship.getBoundingClientRect().width / 2;

//     BULLET

let bulletStart = spaceship.getBoundingClientRect().height + 45;
let bulletVelocity = bulletStart;
let shootPressed = false;


//    KEYS
let started = false;
// let pause = false;
let restart = false;
let move = {left:  0,
            right: 0, 
            shoot: 0 };
let key;

let gameOver = false;


// SCORE  
let score = 0;

// TIMER 
let time = new Date().getTime()
    let seconds = 0;
    let minutes = 0;
let clock = document.getElementById('timer');



let destroyed = false; 


//      ENEMY 
let aliens = Array.from(document.querySelectorAll(".aliens")); // all the aliens
const enemy = document.getElementById("enemy");


let position = 0;  // start position of the enemy 
let direction = true;
let curentY = 0;
let canFire = true;


window.addEventListener("load", () => {
  spaceship.style.position = "absolute";
  spaceship.style.left = playArea - middleOfSpaceShip + "px"; // center the Spaceship
});



//      KEYDOWN


document.addEventListener("keydown", (e) => {
  key = e.key;
  if (key === "Enter") {
    started = true;
    console.log(started);
  } else if (key === "p") {
    if(started){
      instruction.style.opacity = 1;
      spaceship.style.opacity = 0;
      enemy.style.opacity = 0;
      cancelAnimationFrame(gameLoop)
      started=false
    } 
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


//    KEYUP

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


if (started){
  spaceship.style.opacity = 1;
  enemy.style.opacity = 1;
}



//      TIMER 

function timer(){
 let currentTime = new Date().getTime()

 if(currentTime - time >= 1000){   // 1000 mili sec = 1 sec  
  time = currentTime     // reset time to curretTime 
  seconds++     // add the second to the time 
 }

 if(seconds == 60){
  minutes ++
  seconds = 0;
 }

 if(seconds < 10){
  clock.innerHTML = `00:0${seconds}`
 }
 else if(seconds > 10 && minutes == 0){
  clock.innerHTML  = `00:${seconds}`
}
if(minutes >10){
  if (seconds <10){
 clock.innerText =  `${minutes}:0${seconds}` 
} 
else if(seconds >10){
 clock.innerText =  `${minutes}:${seconds}`
}

} else if (minutes >0){
 if (seconds <10){
 clock.innerText =  `0${minutes}:0${seconds}` 
} 
else if(seconds >10){
 clock.innerText =  `0${minutes}:${seconds}`
}
}

}



//      MOVE ENEMY 

function animateEnemy() {
  position += 4;

  if (enemy.getBoundingClientRect().right < container.getBoundingClientRect().right && direction) {
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
  } else{
      if (direction === true){
      curentY += 80;
      // console.log("curentY", curentY);
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = false;
    }
    position -= 8;
    enemy.style.transform = `translate(${position}px, ${curentY}px)`;
    if (position < 4) {
      curentY += 80;
       
      enemy.style.transform = `translate(${position}px, ${curentY}px)`;
      direction = true;
    }
  }
  if (enemy.getBoundingClientRect().bottom >= spaceship.getBoundingClientRect().top){
    let hearts = Array.from(document.getElementsByClassName('heart'))
    console.log(hearts.length);
    if(hearts == null || hearts.length ==0 ){
      spaceship.style.opacity=0;
      enemy.style.opacity=0;
      let gameover = document.getElementById('gameover')
      let finalScore = document.getElementById('finalscore')
      finalScore.innerHTML = `Final score: ${score}`
      gameover.style.opacity = 1; 
      gameOver = true;
      cancelAnimationFrame(gameLoop) 
      bullet.remove()
      for(let i=0; i<1; i++){
        console.log({gameOver})
      }
    }
    position =0
    curentY =0

   setTimeout(function(){
    if(hearts.length >0){
      hearts[Array.length-1].remove()
   }
    },2500)
  }
}



//      MOVE SPACESHIP

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


//    SHOOT BULLET 

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


//    COLLISION

function collisionDetection(){

  let bullet = document.getElementById("laser")
  let aliens = Array.from(document.querySelectorAll(".aliens")); 
  // aliens[i].getBoundingClientRect().x   // getBoundingClient works for each element of the array 

  if (bullet != null){


  if(aliens.every(alien =>{
    !aliens.includes('aliens')
  })){
    let win =document.getElementById('winner')
    win.style.opacity =1
    spaceship.style.opacity=0
    let finalScore = document.getElementById('finalscore2')
    finalScore.innerHTML = `Final score: ${score}`
    cancelAnimationFrame(gameLoop)
    started= false      
    bullet.remove()   
  }

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

//      GAME LOOP 
  
function gameLoop() {
  if (started === true) {
    if (started){
      spaceship.style.opacity = 1;
      enemy.style.opacity = 1;
      instruction.style.opacity = 0;
    }
  if (gameOver === false) {
    timer()
    animateEnemy();
    movePlayer();
    shoot();
    collisionDetection(); 
      }
    }
  requestAnimationFrame(gameLoop);
  }




window.requestAnimationFrame(gameLoop);
