//const body = document.body

let spaceship = document.getElementById('spaceship')
let moveBy = 5; // it's an int 

 let container = document.getElementById('container')

 let playArea = container.getBoundingClientRect().width/2

 let widthOfSpaceShip = spaceship.getBoundingClientRect().width/2 

 let margin = container.getBoundingClientRect().width *0.2
 console.log(margin)


 console.log(container.getBoundingClientRect().width);
 console.log(spaceship.getBoundingClientRect().width);
 
 window.addEventListener('load', () =>{
   spaceship.style.position ='absolute'       
   spaceship.style.left = (playArea - widthOfSpaceShip )+'px';    // center the Spaceship 
   
  })
  
  window.addEventListener('keydown', (e) => {
    
    console.log('spaceship',spaceship.getBoundingClientRect());
    console.log('container',container.getBoundingClientRect());
    
    switch (e.key){
      case 'ArrowLeft': 
    console.log('test left', parseInt(spaceship.style.left))
    if (spaceship.getBoundingClientRect().left > margin){
      spaceship.style.left = parseInt(spaceship.style.left)- moveBy +'px';
    } 
    break;
    case 'ArrowRight':
      console.log('test right');
      // console.log(spaceship.getBoundingClientRect().right >container.getBoundingClientRect().width )
      if (spaceship.getBoundingClientRect().right < container.getBoundingClientRect().width - margin){
        spaceship.style.left = parseInt(spaceship.style.left) + moveBy +'px'
      }
      break;
  }
})
 

