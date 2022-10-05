//const body = document.body

let spaceship = document.getElementById('spaceship')

const spaceshipVelocity = 15; // it's an int 

let container = document.getElementById('container')

let playArea = container.getBoundingClientRect().width/2

let middleOfSpaceShip = spaceship.getBoundingClientRect().width/2 

let limit = container.getBoundingClientRect().width *0.2


let started = false
let pause = false 
let restart = false 


let aliens = document.getElementsByClassName('aliens')  // all the aliens


console.log(aliens);

let aliensStartPosition = playArea - (675/2) 


// console.log(aliens.getBoundingClientRect()) 

for (let i = 0; i < aliens.length; i++){
  aliens[i]= aliensStartPosition + 'px'
}

console.log(aliensStartPosition);

// let middleAlien = aliens.length/2




// console.log(middleAlien)

//  console.log(container.getBoundingClientRect().width);
//  console.log(spaceship.getBoundingClientRect().x);
//  console.log(middleOfSpaceShip);

  window.addEventListener('load', () =>{
    spaceship.style.position ='absolute'       
    spaceship.style.left = (playArea - middleOfSpaceShip )+'px';    // center the Spaceship 
  })


  function movePlayer(key){
    
  console.log('spaceship left: ',spaceship.getBoundingClientRect().left);
  console.log('spaceship right: ',spaceship.getBoundingClientRect().right);
  
  // console.log('container',container.getBoundingClientRect().x);
  // console.log('container',container.getBoundingClientRect().y);

  switch (key){
      case 'ArrowLeft': 
    // console.log('test left', parseInt(spaceship.style.left))
    if (spaceship.getBoundingClientRect().left > limit){
      spaceship.style.left = parseInt(spaceship.style.left) - spaceshipVelocity +'px';
    } 
    break;
    case 'ArrowRight':
      // console.log('test right');
      // console.log(spaceship.getBoundingClientRect().right >container.getBoundingClientRect().width )
      if (spaceship.getBoundingClientRect().right < container.getBoundingClientRect().width - limit){
        spaceship.style.left = parseInt(spaceship.style.left) + spaceshipVelocity +'px'
      }
      break;
  }
}


 function drawAllien(){

 }


function shoot(key){

if(key == " "){
  
  let bullet = document.createElement("IMG");
   
  bullet.src = "./img/bullet.png"
  
  bullet.setAttribute("id","laser")
  
  container.appendChild(bullet);

  const speed = 5;
  const delay = 7;
  const damage = 1;
  const bulletY = spaceship.getBoundingClientRect().y;
  const bulletX = spaceship.getBoundingClientRect().x + middleOfSpaceShip


 bullet.style.left = (bulletX) + 'px'

  console.log('bullet',bullet.getBoundingClientRect()) 
  console.log('spaceship:',spaceship.getBoundingClientRect())


}

} 

  document.addEventListener('keydown', e =>{
    switch(e.key){
      case 's': 
        started = true; 
      case 'p': 
        pause = true;
      case 'r':
        restart = true;
      case " ":
       shoot(e.key);
      case 'ArrowLeft':
        movePlayer(e.key)
        break;
      case 'ArrowRight':
        movePlayer(e.key)
        break;
   }
  })

  
    function gameLoop(){
    drawAllien()
    shoot();

    requestAnimationFrame(gameLoop)
  }
    
   window.requestAnimationFrame(gameLoop)
    


