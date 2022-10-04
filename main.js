//const body = document.body

let spaceship = document.getElementById('spaceship')

let spaceshipVelocity = 1; // it's an int 

let delta = 0; 


let lastFrameTimeMs = 0;

let timeStamp = 1000/60;

let maxFPS = 10; 

 let container = document.getElementById('container')

 let playArea = container.getBoundingClientRect().width/2

 let widthOfSpaceship = spaceship.getBoundingClientRect().width/2 

 let limit = container.getBoundingClientRect().width *0.2
//  console.log(margin)


// document.addEventListener("keydown", this.keydown);
// document.addEventListener("keyup", this.keyup);



//let enemy = document.createElement('div')

 let aliens = [1,2,3,4,5,6,7,8,9,10,
              11,12,14,15,16,17,18,19,20,
              21,22,23,24,25,26,27,28,29,30]

 //container.append(aliens)             
     
//  console.log(container.getBoundingClientRect().width);
//  console.log(spaceship.getBoundingClientRect().width);

  window.addEventListener('load', () =>{
    spaceship.style.position ='absolute'       
    spaceship.style.left = (playArea - widthOfSpaceship )+'px';    // center the Spaceship 
  

  });
  
  function movePlayer(delta){
  
    spaceship.position  += spaceshipVelocity * delta;
    
    document.addEventListener('keydown', (e) => {

    
    // console.log('spaceship',spaceship.getBoundingClientRect());
    // console.log('container',container.getBoundingClientRect());
    
      switch (e.key){
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
  })

  // document.addEventListener('keyup', (e) => {

  //   if (e.key === x){

  //   }

  // })
};

function panic() {
  delta = 0; // discard the unsimulated time
  // ... snap the player to the authoritative state
}


let fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0;
 


function gameLoop(timeStamp){
  if (timeStamp < lastFrameTimeMs + (1000 / maxFPS)) {
    requestAnimationFrame(gameLoop);
    return;
  }

  delta - timeStamp - lastFrameTimeMs;
  lastFrameTimeMs = timeStamp;

  let numUpdateSteps = 0;
  while (delta >= timeStamp) {
    update(timeStamp);
    delta -= timeStamp;
    if (++numUpdateSteps >= 240) {
      panic(); // fix things
      break; // bail out
  }
}

  movePlayer(delta);

  requestAnimationFrame(gameLoop)

}


window.requestAnimationFrame(gameLoop)




