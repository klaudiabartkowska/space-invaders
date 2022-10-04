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

//  console.log(margin)

//let enemy = document.createElement('div')

 let aliens = [1,2,3,4,5,6,7,8,9,10,
              11,12,14,15,16,17,18,19,20,
              21,22,23,24,25,26,27,28,29,30]

 //container.append(aliens)             
     
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

function shootBullet(key){
  console.log('space ');
  let bullet = document.createElement("IMG");
  console.log(bullet);

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
       shootBullet(e.key);
      case 'ArrowLeft':
        movePlayer(e.key)
        break;
      case 'ArrowRight':
        movePlayer(e.key)
        break;
   }
  })

  
    function gameLoop(){
    // shootBullet();

    requestAnimationFrame(gameLoop)
  }
    
   window.requestAnimationFrame(gameLoop)
    


