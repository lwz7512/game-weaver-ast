/**
 * test two value: x, y if equal, and throw errorMessage if not
 */
function assertEqual(x, y, errorMessage = 'Test Case Failed!') {
  if (
    x === y ||
    (typeof x === 'object' &&
      typeof y === 'object' &&
      x.length === y.length &&
      x.every((element, index) => element === y[index]))
  ) {
    return
  }
  throw new Error(errorMessage)
}

function assertTrue(x) {
  assertEqual(x, true)
}

function assertFalse(x) {
  assertEqual(x, false)
}

// ===================== END OF TEST FUNCTIONS ======================

// == remember drawing result for test case use ==
const funTracer = []
const grassPositions = []
const molePositions = []

// base functions hidden from user ... but need to be included for client side running & testing
console.log('## this is a challenge code base ...')

// ====== Mock Validator ===========
const tester = () => {
  const largeHeightSet = []
  const zeroHeightSet = []
  molePositions.forEach((h) => {
    if (h === 45) largeHeightSet.push(1)
    if (h === 0) zeroHeightSet.push(1)
  })
  const fullHeight_1 = largeHeightSet.length === 1
  const zeroHeight_15 = zeroHeightSet.length === 15

  if (fullHeight_1 && zeroHeight_15) return true
  return false
}

// =============== starting challenge main code block ===================

const canvas = document.getElementById('codePresenter')
const ctx = canvas.getContext('2d')

// ====== start drawing =============

// STEP - 1: build grass list
for (let i = 0; i < 100; i += 1) {
  const startX = 450 * Math.random()
  const startY = 150 + 250 * Math.random()
  grassPositions.push({
    startX,
    startY,
  })
}

// STEP - 2: build sky background and grassland

function drawSkyAndGrassland() {
  ctx.clearRect(0, 0, 450, 450)

  // background sky, add linear gradient
  const grd = ctx.createLinearGradient(0, 0, 0, 150)
  // light blue
  grd.addColorStop(0, '#448EE4')
  // dark blue
  grd.addColorStop(1, '#5ACAF9')

  ctx.fillStyle = grd
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // grassland
  ctx.fillStyle = '#bed742'
  ctx.fillRect(0, 250, canvas.width, 130)
  ctx.beginPath()
  ctx.ellipse(220, 250, 300, 150, 0, 0, Math.PI, true)
  ctx.fill()

  // weed from positions
  grassPositions.forEach(({ startX, startY }) => {
    ctx.fillStyle = '#1d953f'
    ctx.beginPath()
    ctx.moveTo(startX, startY)
    ctx.lineTo(startX + 8, startY - 30)
    ctx.lineTo(startX + 4, startY)
    ctx.fill()
  })

  // TODO: clear position list at each start of mole-grid painting
  molePositions.length = 0
}

// STEP - 3: BUILD MOLE GRID

/**
 * TODO: to check postion list in validator
 *
 * draw bigger hole as mask, with body position(0 ~ 45) above its burrow
 */
function drawMoleHoleWithDynaHead(posX, posY, position = 0) {
  // save each position to validate later
  molePositions.push(position)

  // keep current unclipped context
  ctx.save()

  const r = 36
  // transparent mask
  ctx.fillStyle = 'rgba(0, 0, 0, 0)'
  ctx.beginPath()
  ctx.moveTo(posX, posY)
  ctx.lineTo(posX + 2 * r, posY)
  ctx.lineTo(posX + 2 * r, posY + 50)
  ctx.ellipse(posX + r, posY + 50, r, r * 0.3, 0, 0, Math.PI)
  ctx.fill()
  ctx.clip()

  // draw dark hole
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.ellipse(posX + r, posY + 50, r, r * 0.3, 0, 0, 2 * Math.PI)
  ctx.fill()
  // mole head & body
  ctx.fillStyle = '#AD7223'
  ctx.beginPath()
  ctx.arc(posX + r, posY + 66 - position, 20, Math.PI * 0.75, 2.25 * Math.PI)
  ctx.lineTo(posX + (r * 5) / 3, posY + 120 - position)
  ctx.ellipse(posX + r, posY + 120 - position, (r * 2) / 3, 10, 0, 0, Math.PI)
  ctx.closePath()
  ctx.stroke()
  ctx.fill()

  // draw eyes
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(posX + r - 10, posY + 62 - position, 2, 0, 2 * Math.PI)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(posX + r + 10, posY + 62 - position, 2, 0, 2 * Math.PI)
  ctx.fill()

  // draw nose
  ctx.fillStyle = '#CFA049'
  ctx.beginPath()
  ctx.ellipse(
    posX + r,
    posY + 70 - position,
    r * 0.18,
    r * 0.2,
    0,
    0,
    2 * Math.PI,
  )
  ctx.fill()
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(posX + r, posY + 72 - position, 2, 0, 2 * Math.PI)
  ctx.fill()
  ctx.strokeStyle = '#333333'
  ctx.beginPath()
  ctx.ellipse(posX + r, posY + 65 - position, r * 0.14, r * 0.2, 0, 0, Math.PI)
  ctx.stroke()

  // draw mustache
  ctx.strokeStyle = '#000000'
  ctx.beginPath()
  // left part - 1
  ctx.moveTo(posX + r - 8, posY + 70 - position)
  ctx.lineTo(posX + r - 16, posY + 68 - position)
  // left part - 2
  ctx.moveTo(posX + r - 8, posY + 73 - position)
  ctx.lineTo(posX + r - 16, posY + 71 - position)
  // right part - 1
  ctx.moveTo(posX + r + 8, posY + 70 - position)
  ctx.lineTo(posX + r + 16, posY + 68 - position)
  // right part - 2
  ctx.moveTo(posX + r + 8, posY + 73 - position)
  ctx.lineTo(posX + r + 16, posY + 71 - position)
  ctx.stroke()

  // finish one session of drawing
  ctx.restore()
}

// ======= Global reference attached to window object
window.animationRunning = false
// NOTE: only defined ONCE! as a global variable!
if (window.animRequestRef === undefined) {
  window.animRequestRef = 0
}

const isGameRunning = () => window.animationRunning

// ==== MAIN LOOP FUNCTION ===

let loopCounter = 0

const loop = () => {
  // one run any way
  loopCounter += 1

  // FLAG TO STOP LOOP
  if (!isGameRunning()) {
    return console.log('## game running skipped!')
  }

  //  save the animation request id
  window.animRequestRef = window.requestAnimationFrame(loop)

  // NOTE: only continue at each 1 second
  if (loopCounter % 60 !== 0) return

  if (typeof window.paintOnEachSecond !== 'undefined') {
    // leave this to user implementaion...
    // so its is undefined in base code
    window.paintOnEachSecond()
  }
  // console.log(`>> Tick/sec!`)
}

const stopGame = () => {
  window.cancelAnimationFrame(window.animRequestRef)
  window.animationRunning = false
  console.log(` ### game stopped first! ### `)
}

// expose it to global
window.stopGame = stopGame

/**
 * === Main function to start game repainting ===
 */
const startGame = (painter) => {
  // stop loop before each game starting!
  stopGame()
  window.animationRunning = true
  window.paintOnEachSecond = painter
  // START loop
  window.animRequestRef = window.requestAnimationFrame(loop)
  console.log(` ### game loop started! ###`)
  // start first paint to enable validator
  painter()
}

/**
 * Main function that paint a Whac-A-Mole grid
 */
const paintOnEachSecond = () => {
  // PARAMETERS USED IN THIS DRAWING:

  const mSize = 4
  const mStartX = 36
  const mStartY = 100
  const mWidth = 100
  const mHeight = 64

  const randomMole = Math.floor(Math.random() * mSize * mSize)

  // MAIN DRAWING STEPS:

  // - Part 1 -
  drawSkyAndGrassland()

  // - Part 2 -
  for (let row = 0; row < mSize; row += 1) {
    for (let col = 0; col < mSize; col += 1) {
      const posX = col * mWidth + mStartX
      const posY = row * mHeight + mStartY
      const index = row * mSize + col
      // find the target one, and make it outstanding
      const dynaHeightForMole = index === randomMole ? 45 : 0
      drawMoleHoleWithDynaHead(posX, posY, dynaHeightForMole)
    }
  }
}

// start game
startGame(paintOnEachSecond)
