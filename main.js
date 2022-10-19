let spaceship = document.getElementById('spaceship')

const spaceshipVelocity = 15; // it's an int 

let container = document.getElementById('container')
let spaceshipDiv = document.querySelector(".spaceshipDiv")
container.append(spaceshipDiv)

let playArea = container.getBoundingClientRect().width/2

let middleOfSpaceShip = spaceship.getBoundingClientRect().width/2 

let limit = container.getBoundingClientRect().width *0.2

let bulletStart = spaceship.getBoundingClientRect().height + 45
console.log(spaceship.getBoundingClientRect(), "gsgsgsf")
let bulletVelocity = bulletStart; 
let started = false
let pause = false 
let restart = false 
let shootPressed = false 



let aliens = Array.from(document.querySelectorAll('.aliens'))  // all the aliens

const enemy = document.getElementById('enemy')
let gameOver = false
let position = 0;
let down = 40;  
let direction = true; 
let curentY = 0
let canFire =true
// enemy.style.transform = container.getBoundingClientRect().x + 'px'
console.log(aliens[1]); // use for remove index 



function animateEnemy(){

  position += 2; 

    if((enemy.getBoundingClientRect().right < container.getBoundingClientRect().right) && direction){
     enemy.style.transform = `translate(${position}px, ${curentY}px)` 
    
    }else{
      if(direction === true){
        curentY += 80
        console.log("curentY", curentY)
        enemy.style.transform = `translate(${position}px, ${curentY}px)` 
        direction = false
      } 
      position -= 4;
      enemy.style.transform = `translate(${position}px, ${curentY}px)` 
      if(position < 4){
        curentY += 80
        enemy.style.transform = `translate(${position}px, ${curentY}px)` 
        direction = true;
      }
    }
      if(enemy.getBoundingClientRect().bottom >= spaceship.getBoundingClientRect().top ){
        gameOver = true 
      } 
  }


  window.addEventListener('load', () =>{
    spaceship.style.position ='absolute'       
    spaceship.style.left = (playArea - middleOfSpaceShip )+'px';    // center the Spaceship 
  })


  function movePlayer(){
    
  // console.log('spaceship left: ',spaceship.getBoundingClientRect().left);
  // console.log('spaceship right: ',spaceship.getBoundingClientRect().right);
  
  // console.log('container',container.getBoundingClientRect().x);
  // console.log('container',container.getBoundingClientRect().y);

  if(key == "ArrowLeft"){
    if (spaceship.getBoundingClientRect().left > container.getBoundingClientRect().left ){
      spaceship.style.left = parseInt(spaceship.style.left) - spaceshipVelocity +'px';
    } 
  }
  if(key == "ArrowRight"){
    if (spaceship.getBoundingClientRect().right < container.getBoundingClientRect().right){
      spaceship.style.left = parseInt(spaceship.style.left) + spaceshipVelocity +'px'
    }
  }

  // switch (key){
  //     case 'ArrowLeft': 
  //   // console.log('test left', parseInt(spaceship.style.left))
  //   if (spaceship.getBoundingClientRect().left > container.getBoundingClientRect().left ){
  //     spaceship.style.left = parseInt(spaceship.style.left) - spaceshipVelocity +'px';
  //   } 
  //   break;
  //   case 'ArrowRight':
  //     // console.log('test right');
  //     // console.log(spaceship.getBoundingClientRect().right >container.getBoundingClientRect().width )
  //     if (spaceship.getBoundingClientRect().right < container.getBoundingClientRect().right){
  //       spaceship.style.left = parseInt(spaceship.style.left) + spaceshipVelocity +'px'
  //     }
  //     break;
  // }
}


function shoot(){
  
  if(key == " " && canFire || (key == " " && key == "ArrowLeft") || (key == " " && key =="ArrowRight")){

    canFire = false
    shootPressed = true; 
    let bullet = document.createElement("IMG");
    
    bullet.src = "./img/bullet.png"
    
    bullet.setAttribute("id","laser")
    const body= document.querySelector("body")
    body.append(bullet)
    
    const bulletY = spaceship.getBoundingClientRect().top-13 + "px"
    const bulletX =  ((spaceship.getBoundingClientRect().right + spaceship.getBoundingClientRect().left)/ 2)-13+'px'
   



    
  // console.log(spaceship.getBoundingClientRect().y)
  // console.log(spaceship.getBoundingClientRect().x, "x numb")


  // bullet.style.bottom = bulletY
  bullet.style.bottom = bulletStart +"px"
  bullet.style.left = bulletX
 
}

let bullet = document.getElementById('laser')


if(bullet != null){
  // console.log(bulletVelocity, bulletStart);
  bullet.style.bottom = bulletVelocity +"px"
  bulletVelocity += 10
  // console.log(bulletVelocity);
  console.log('container ',container.getBoundingClientRect(), bulletVelocity);
  if(bulletVelocity - spaceship.getBoundingClientRect().height /2 >= container.getBoundingClientRect().height ){
    console.log("hh")
    bulletVelocity = bulletStart
    bullet.remove()
    canFire =true
    // console.log(bulletVelocity, bulletStart);
  }
  
  // if(bullet.getBoundingClientRect().top === container.getBoundingClientRect().top){
  // console.log('bullet ',bullet.getBoundingClientRect())
  // console.log('match');
}
  //   bullet.remove()
  // }


// console.log(bulletVelocity)

} 
  document.addEventListener('keyup', e=>{
    key = ""
  } )
  document.addEventListener('keydown', e =>{
    key = e.key
    switch(e.key){
      case 'Enter': 
        started = true;
        console.log(started); 
      case 'p': 
        pause = true;
        console.log(pause);
      case 'r':
        restart = true;
      // case " ":
      //  shoot(e.key);
      // case 'ArrowLeft':
      //   movePlayer(e.key)
      //   break;
      // case 'ArrowRight':
      //   movePlayer(e.key)
      //   break;
   }
  })

  
    function gameLoop(){
    if(started === true){
      if(gameOver === false) {
      animateEnemy();
      movePlayer();
      shoot()
    }
    shoot();

  }
    requestAnimationFrame(gameLoop)
  }

    
   window.requestAnimationFrame(gameLoop)
    


