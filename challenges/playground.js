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

// base functions hidden from user ... but need to be included for client side running & testing
// console.log('## this is a challenge code base ...')

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
const grassPositions = []
const molePositions = []
const canvas = document.getElementById('codePresenter')
const ctx = canvas.getContext('2d')

// hide cursor
canvas.style.cursor = 'none'

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

function drawSkyAndGrassland(ctx) {
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
function drawMoleHoleWithDynaHead(ctx, posX, posY, position = 0) {
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

let globalMouseX = 0
let globalMouseY = 0

let globalRandomMole = 0

document.addEventListener('mousemove', function (mouseEvent) {
  globalMouseX = mouseEvent.clientX
  globalMouseY = mouseEvent.clientY
})

const loop = () => {
  loopCounter += 1
  // schedule next run any way
  window.animRequestRef = window.requestAnimationFrame(loop)

  // FLAG TO STOP LOOP
  if (!isGameRunning()) {
    return console.log('## game running skipped!')
  }

  // == Part-1: main drawing logic, first ==
  window.mainScenePainter && window.mainScenePainter(globalRandomMole)
  // == Part-2: cursor drawing logic ==
  window.mouseViewPainter && window.mouseViewPainter()

  // NOTE: only continue at each 1 second
  if (loopCounter % 60 !== 0) return

  if (typeof window.mainScenePainter !== 'undefined') {
    // update the mole position at each second
    globalRandomMole = Math.floor(Math.random() * 16)
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
const startGame = (painter, cursor) => {
  // stop loop before each game starting!
  stopGame()
  window.animationRunning = true
  window.mainScenePainter = painter
  window.mouseViewPainter = cursor
  // START loop
  window.animRequestRef = window.requestAnimationFrame(loop)
  console.log(` ### game loop started! ###`)
  // start first paint to enable validator
  painter()
}

/**
 * Main function that paint a Whac-A-Mole grid
 */
const paintMainScene = (randomMole) => {
  // PARAMETERS USED IN THIS DRAWING:

  const mSize = 4
  const mStartX = 36
  const mStartY = 100
  const mWidth = 100
  const mHeight = 64

  // MAIN DRAWING STEPS:

  // - Part 1 -
  drawSkyAndGrassland(ctx)

  // - Part 2 -
  for (let row = 0; row < mSize; row += 1) {
    for (let col = 0; col < mSize; col += 1) {
      const posX = col * mWidth + mStartX
      const posY = row * mHeight + mStartY
      const index = row * mSize + col
      // find the target one, and make it outstanding
      const dynaHeightForMole = index === randomMole ? 45 : 0
      drawMoleHoleWithDynaHead(ctx, posX, posY, dynaHeightForMole)
    }
  }
}

function drawRotatedRect(ctx, x, y, width, height, degrees) {
  // first save the untranslated/unrotated context
  ctx.save()

  ctx.beginPath()
  // move the rotation point to the center of the rect
  ctx.translate(x + width / 2, y + height / 2)
  // rotate the rect
  ctx.rotate((degrees * Math.PI) / 180)

  // draw the rect on the transformed context
  // Note: after transforming [0,0] is visually [x,y]
  // so the rect needs to be offset accordingly when drawn
  ctx.roundRect(-width / 2, -height / 2, width, height, [5])

  ctx.fillStyle = 'gold'
  ctx.fill()

  // restore the context to its untranslated/unrotated state
  ctx.restore()
}

const paintHammerUp = (ctx, mx, my) => {
  // Draw the ellipse
  ctx.fillStyle = 'red'
  // Draw the ellipse
  ctx.beginPath()
  ctx.ellipse(mx + 12, my - 18, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx + 8, my - 12, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx + 4, my - 6, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx - 4, my + 6, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx - 8, my + 12, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx - 12, my + 18, 6, 20, -Math.PI / 3, 0, 2 * Math.PI)
  ctx.fill()

  drawRotatedRect(ctx, mx + 6, my + 22, 80, 10, 30)
}

const paintHammerDown = (ctx, mx, my) => {
  // Draw the ellipse
  ctx.fillStyle = 'red'
  // Draw the ellipse
  ctx.beginPath()
  ctx.ellipse(mx, my - 8, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my - 2, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my + 4, 12, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my + 10, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my + 16, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my + 22, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(mx, my + 28, 6, 20, -Math.PI / 2, 0, 2 * Math.PI)
  ctx.fill()

  drawRotatedRect(ctx, mx + 6, my + 22, 80, 10, 15)
}

/**
 * draw hammer following mouse move ...
 */
const paintMouseFollowHammer = () => {
  paintHammerUp(ctx, globalMouseX, globalMouseY)
}

// start game
startGame(paintMainScene, paintMouseFollowHammer)
