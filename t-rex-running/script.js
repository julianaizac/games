const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let isJumping = false
let position = 0

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump()
    }
  }
}

function jump() {
  isJumping = true
  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval)
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          dino.style.bottom = position + 'px';
        }
      }, 30) 
    } else {
      position += 20
      dino.style.bottom = position + 'px';
    }
  }, 30) 
}

function createCactus() {
  const cactus = document.createElement('div')
  let cactusPosition = 1300
  let randomTime = Math.random() * (3000 - 100) + 100

  cactus.classList.add('cactus')
  cactus.style.left = 1300 + 'px'
  background.appendChild(cactus)

  let leftInterval = setInterval(() => {
    
    if (cactusPosition < -60) {
      clearInterval(leftInterval)
      background.removeChild(cactus)
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval)
      isGameOver = true;
      document.body.innerHTML = `
                                  <h1 class="game-over">GAME OVER</h1>
                                  <p class="restart">Press F5 to restart</p>
                                `
    } else {
      cactusPosition -= 10 
      cactus.style.left = cactusPosition + 'px'
    }
  }, 20)
  setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyUp)