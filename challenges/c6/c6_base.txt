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
    return;
  }
  throw new Error(errorMessage);
}

function assertTrue(x) {
  assertEqual(x, true);
}

function assertFalse(x) {
  assertEqual(x, false);
}

// ===================== END OF TEST FUNCTIONS ======================

// == remember drawing result for test case use ==
const funTracer = [];

// base functions hidden from user ... but need to be included for client side running & testing
// console.log('## this is a challenge code base ...')

// ====== NOTE: Mock Validator NOT IN USE! ===========
const tester = () => {
  const largeHeightSet = [];
  const zeroHeightSet = [];
  molePositions.forEach((h) => {
    if (h === 45) largeHeightSet.push(1);
    if (h === 0) zeroHeightSet.push(1);
  });
  const fullHeight_1 = largeHeightSet.length === 1;
  const zeroHeight_15 = zeroHeightSet.length === 15;

  if (fullHeight_1 && zeroHeight_15) return true;
  return false;
};

// =============== Network Assets =============
const sourceRepo =
  'https://raw.githubusercontent.com/lwz7512/game-weaver-ast/master/';
const hitSoundFile = `${sourceRepo}assets/sound/punch-hit-pixabay.mp3`;
const ouchSoundFile = `${sourceRepo}assets/sound/ough-pixabay.mp3`;
const hitSoundTrack = new Audio(hitSoundFile);
hitSoundTrack.playbackRate = 2; // faster play
const ouchSoundTrack = new Audio(ouchSoundFile);
ouchSoundTrack.playbackRate = 2; // faster play
// =============== starting challenge main code block ===================
const grassPositions = [];
const molePositions = [];
const canvas = document.getElementById('codePresenter');
const ctx = canvas.getContext('2d');

// hide cursor
canvas.style.cursor = 'none';

// ====== start drawing =============

// ======= Global reference attached to window object
window.animationRunning = false;
// NOTE: only defined ONCE! as a global variable!
if (window.animRequestRef === undefined) {
  window.animRequestRef = 0;
}

const isGameRunning = () => window.animationRunning;

// ======== Global game context info will change wile game running ===============
let globalMouseX = 0;
let globalMouseY = 0;
let isMouseDown = false;
let loopCounter = 0;
let globalRandomMole = 0;
// ======== End of global game context =============

/** ====== Utility functions about canvas ====== */
const getCanvasPosition = () => {
  const canvasRect = canvas.getBoundingClientRect();
  return { x: canvasRect.x, y: canvasRect.y };
};

const getCursorPositionInCanvas = () => {
  const canvasPosition = getCanvasPosition();
  const hammerX = globalMouseX - canvasPosition.x;
  const hammerY = globalMouseY - canvasPosition.y;
  return [hammerX, hammerY];
};
// ====== End of utility functions ======

/**
 * ==== MAIN LOOP FUNCTION ===
 */
const loop = () => {
  loopCounter += 1;
  // schedule next run any way
  window.animRequestRef = window.requestAnimationFrame(loop);

  // FLAG TO STOP LOOP
  if (!isGameRunning()) {
    return console.log('## game running skipped!');
  }

  if (loopCounter % 2) return;

  // == Part-1: main drawing logic, first ==
  window.mainScenePainter && window.mainScenePainter(ctx);
  // == Part-2: cursor drawing logic with canvas `ctx` ==
  window.mouseViewPainter && window.mouseViewPainter(ctx);

  // NOTE: only continue at each 1.0 second
  if (loopCounter % 60 !== 0) return;

  if (typeof window.mainScenePainter !== 'undefined') {
    // update the mole position at each second
    window.stateUpdaterBySecond && window.stateUpdaterBySecond();
  }
  // console.log(`>> Tick/sec!`)
};

const stopGame = () => {
  window.cancelAnimationFrame(window.animRequestRef);
  window.animationRunning = false;
  // console.log(` ### game stopped first! ### `);
};

// expose it to global
window.stopGame = stopGame;

/**
 * === Main function to start game repainting ===
 * @param {function} painterOnFrame main scene painting function
 * @param {function} cursorOnFrame cusor skin painting function
 * @param {function} refreshOnSecond game stage update function
 */
const startGame = (painterOnFrame, cursorOnFrame, refreshOnSecond) => {
  // stop loop before each game starting!
  stopGame();
  // cache render callback
  window.animationRunning = true;
  window.mainScenePainter = painterOnFrame;
  window.mouseViewPainter = cursorOnFrame;
  window.stateUpdaterBySecond = refreshOnSecond;
  // START loop
  window.animRequestRef = window.requestAnimationFrame(loop);
  console.log(` ### game loop started! ###`);
  // start first paint to enable validator
  painterOnFrame(ctx);
};

// ================= Statefull Mole Implementation Area ==============
class SimpleMoleState {
  /** mole x coordinate */
  posX = 0;
  /** mole y coordinate */
  posY = 0;
  /** body z value */
  position = 0;
  index = 0;
  /** is mouse down */
  isHit = false;
  /** mouse x */
  mouseX = 0;
  /** mouse y */
  mouseY = 0;
  /** if being hit by the hammer  */
  isTouching = false;
  /** Dev mode to show reference dot */
  isDebugMode = false;

  constructor(x, y, sequence) {
    this.posX = x;
    this.posY = y;
    this.index = sequence;
  }

  /**
   * TODO: to move this function out ... for user implementation!
   * @returns
   */
  checkCollistion() {
    // const xOffset = 36;
    // const yOffset = 6;
    // const xDiff = this.posX - this.mouseX;
    // const yDiff = this.posY - this.mouseY;
    // const distance = Math.hypot(xDiff + xOffset, yDiff + yOffset);
    // // distance within this threshold considered hit success!
    // const threshold = 30;
    // console.log(distance);
    // return threshold > distance;
    return false;
  }

  /**
   * check if cucrent mole is visible
   * @returns if is showing up
   */
  checkIsVisible() {
    return this.index === this.position;
  }

  /**
   * Set mouse state flag to check later
   * @param {boolean} mouseDownFlag
   */
  setHitState(mouseDownFlag) {
    this.isHit = mouseDownFlag;
  }

  /**
   * Save the mouse position to check collision later
   * @param {number} mX mouse x
   * @param {number} mY mouse y
   */
  setMousePosition(mX, mY) {
    this.mouseX = mX;
    this.mouseY = mY;
  }

  /**
   * Pop up random mole by index of grid
   * @param {number} z index of mole grid
   */
  selectMoleAt(z) {
    this.position = z;
  }

  setDebugMode() {
    this.isDebugMode = true;
  }

  /**
   *
   * draw bigger hole as mask, with body position(0 ~ 45) above its burrow
   */
  drawMoleHoleWithDynaHead(ctx, posX, posY, position = 0) {
    // save each position to validate later
    molePositions.push(position);

    // keep current unclipped context
    ctx.save();
    // hole diameter size
    const r = 36;
    // transparent mask
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.beginPath();
    ctx.moveTo(posX, posY);
    ctx.lineTo(posX + 2 * r, posY);
    ctx.lineTo(posX + 2 * r, posY + 50);
    ctx.ellipse(posX + r, posY + 50, r, r * 0.3, 0, 0, Math.PI);
    ctx.fill();
    ctx.clip();

    // draw dark hole
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(posX + r, posY + 50, r, r * 0.3, 0, 0, 2 * Math.PI);
    ctx.fill();
    // mole head & body
    ctx.fillStyle = '#AD7223';
    ctx.beginPath();
    ctx.arc(posX + r, posY + 66 - position, 20, Math.PI * 0.75, 2.25 * Math.PI);
    ctx.lineTo(posX + (r * 5) / 3, posY + 120 - position);
    ctx.ellipse(
      posX + r,
      posY + 120 - position,
      (r * 2) / 3,
      10,
      0,
      0,
      Math.PI
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    // === Eyes state change by hit flag ===
    if (this.isTouching) {
      ctx.beginPath();
      // left close eyes
      ctx.moveTo(posX + r - 12, posY + 56 - position);
      ctx.lineTo(posX + r - 6, posY + 60 - position);
      ctx.lineTo(posX + r - 12, posY + 64 - position);
      // right close eyes
      ctx.moveTo(posX + r + 12, posY + 56 - position);
      ctx.lineTo(posX + r + 6, posY + 60 - position);
      ctx.lineTo(posX + r + 12, posY + 64 - position);
      ctx.stroke();
    } else {
      ctx.fillStyle = '#000000';
      // eyes is open
      ctx.beginPath();
      ctx.arc(posX + r - 10, posY + 62 - position, 3, 0, 2 * Math.PI);
      ctx.fill();
      // eyes is open
      ctx.beginPath();
      ctx.arc(posX + r + 10, posY + 62 - position, 3, 0, 2 * Math.PI);
      ctx.fill();
    }

    // draw nose
    ctx.fillStyle = '#CFA049';
    ctx.beginPath();
    ctx.ellipse(
      posX + r,
      posY + 70 - position,
      r * 0.18,
      r * 0.2,
      0,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(posX + r, posY + 72 - position, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.beginPath();
    ctx.ellipse(
      posX + r,
      posY + 65 - position,
      r * 0.14,
      r * 0.2,
      0,
      0,
      Math.PI
    );
    ctx.stroke();

    // draw mustache
    ctx.strokeStyle = '#000000';
    ctx.beginPath();
    // left part - 1
    ctx.moveTo(posX + r - 8, posY + 70 - position);
    ctx.lineTo(posX + r - 16, posY + 68 - position);
    // left part - 2
    ctx.moveTo(posX + r - 8, posY + 73 - position);
    ctx.lineTo(posX + r - 16, posY + 71 - position);
    // right part - 1
    ctx.moveTo(posX + r + 8, posY + 70 - position);
    ctx.lineTo(posX + r + 16, posY + 68 - position);
    // right part - 2
    ctx.moveTo(posX + r + 8, posY + 73 - position);
    ctx.lineTo(posX + r + 16, posY + 71 - position);
    ctx.stroke();

    // TODO: draw hit reference red dot
    if (this.isDebugMode) {
      ctx.moveTo(posX, posY);
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      // NOTE: this is the hit detection coordinates
      ctx.arc(posX + 36, posY + 6, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // finish one session of drawing
    ctx.restore();
  }

  /**
   * Draw mole look by hit state
   * @param {CanvasRenderingContext2D} ctx canvas context
   */
  render(ctx) {
    const visible = this.checkIsVisible();
    const h = visible ? 45 : 0;
    // is showing and mouse down!
    if (visible && this.isHit) {
      const collided = this.checkCollistion();
      if (collided) {
        this.isTouching = true;
        // play sound
        ouchSoundTrack.play();
        // console.log(`### Being hited!`);
      }
    } else {
      this.isTouching = false;
    }
    // simulate the hit effect to move body down a bit
    const bodyY = this.isTouching ? 20 : h;
    this.drawMoleHoleWithDynaHead(ctx, this.posX, this.posY, bodyY);
  }
}

// ================  End of Statefull Mole implementation ===============
// ================ Hammer Implemenation Area =========================

/**
 * Hammer State Machine
 * @date 2024/06/23
 */
class SimpleHammerState {
  currentState = 'UP'; // UP | DOWN
  _canvasCtx = null;

  setState(upOrDn) {
    this.currentState = upOrDn;
  }

  drawRotatedRect(ctx, x, y, width, height, degrees) {
    // first save the untranslated/unrotated context
    ctx.save();

    ctx.beginPath();
    // move the rotation point to the center of the rect
    ctx.translate(x + width / 2, y + height / 2);
    // rotate the rect
    ctx.rotate((degrees * Math.PI) / 180);

    // draw the rect on the transformed context
    // Note: after transforming [0,0] is visually [x,y]
    // so the rect needs to be offset accordingly when drawn
    ctx.roundRect(-width / 2, -height / 2, width, height, [5]);

    ctx.fillStyle = 'gold';
    ctx.fill();

    // restore the context to its untranslated/unrotated state
    ctx.restore();
  }

  paintHammerUp(ctx, mx, my) {
    // Draw the ellipse
    ctx.fillStyle = 'red';
    // Draw the ellipse
    ctx.beginPath();
    ctx.ellipse(mx + 12, my - 18, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx + 8, my - 12, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx + 4, my - 6, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx - 4, my + 6, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx - 8, my + 12, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx - 12, my + 18, 6, 20, -Math.PI / 3, 0, 2 * Math.PI);
    ctx.fill();

    this.drawRotatedRect(ctx, mx + 6, my + 22, 80, 10, 30);
  }

  paintHammerDown(ctx, mx, my) {
    // Draw the ellipse
    ctx.fillStyle = 'red';
    // Draw the ellipse
    ctx.beginPath();
    ctx.ellipse(mx, my - 8, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my - 2, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my + 4, 12, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my + 10, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my + 16, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my + 22, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(mx, my + 28, 6, 20, -Math.PI / 2, 0, 2 * Math.PI);
    ctx.fill();

    this.drawRotatedRect(ctx, mx + 6, my + 22, 80, 10, 15);
  }

  /**
   * Draw star with spikes and radius
   *
   * EG: drawStar(175, 100, 12, 30, 15);
   * drawStar(75, 100, 5, 30, 15);
   * drawStar(175, 100, 12, 30, 10);
   * drawStar(75, 200, 6, 30, 15);
   * drawStar(175, 200, 20, 30, 25);
   *
   * @param {number} cx
   * @param {number} cy
   * @param {number} spikes
   * @param {number} outerRadius
   * @param {number} innerRadius
   */
  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    var rot = (Math.PI / 2) * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    ctx.save();
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.lineWidth = 5;
    // ctx.strokeStyle='blue';
    ctx.strokeStyle = 'red';
    ctx.stroke();
    // ctx.fillStyle='skyblue';
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.restore();
  }

  render(ctx) {
    const [hammerX, hammerY] = getCursorPositionInCanvas();
    if (this.currentState === 'UP') {
      this.paintHammerUp(ctx, hammerX, hammerY);
    } else {
      // TODO: check if hit the mole to draw star!
      // for now just draw star at each hit
      this.drawStar(hammerX - 10, hammerY + 30, 12, 30, 15);
      // then draw hammer
      this.paintHammerDown(ctx, hammerX, hammerY);
    }
  } // end of state rendering
} // end of SimpleHammerState

// ============= End of Hammer Implementation Area ========================

// start to prepare game assets ...
const initGrass = () => {
  // STEP - 1: build grass list
  for (let i = 0; i < 100; i += 1) {
    const startX = 450 * Math.random();
    const startY = 150 + 250 * Math.random();
    grassPositions.push({
      startX,
      startY,
    });
  }
};

/**
 * User Customizable Mole!
 * before `initMoleGrid` function
 */
class HitableCuteMole extends SimpleMoleState {
  constructor(posX, posY, index) {
    super(posX, posY, index);
  }

  /**
   * TODO: leave this to user!
   * @returns
   */
  checkCollistion() {
    const xOffset = 36;
    const yOffset = 6;
    const xDiff = this.posX - this.mouseX;
    const yDiff = this.posY - this.mouseY;
    const distance = Math.hypot(xDiff + xOffset, yDiff + yOffset);
    // distance within this threshold considered hit success!
    const threshold = 30;
    // console.log(distance);
    return threshold > distance;
  }
}

/**
 * Moles grid to cache each state of mole
 * @returns
 */
const initMoleGrid = () => {
  // PARAMETERS USED IN THIS DRAWING:
  const moles = [];
  const mSize = 4;
  const mStartX = 36;
  const mStartY = 100;
  const mWidth = 100;
  const mHeight = 64;
  for (let row = 0; row < mSize; row += 1) {
    for (let col = 0; col < mSize; col += 1) {
      const posX = col * mWidth + mStartX;
      const posY = row * mHeight + mStartY;
      const index = row * mSize + col;
      const mole = new HitableCuteMole(posX, posY, index);
      moles.push(mole);
    }
  }
  return moles;
};

// STEP - 2: build sky background and grassland

const drawSkyAndGrassland = (ctx) => {
  ctx.clearRect(0, 0, 450, 450);

  // background sky, add linear gradient
  const grd = ctx.createLinearGradient(0, 0, 0, 150);
  // light blue
  grd.addColorStop(0, '#448EE4');
  // dark blue
  grd.addColorStop(1, '#5ACAF9');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // grassland
  ctx.fillStyle = '#bed742';
  ctx.fillRect(0, 250, canvas.width, 130);
  ctx.beginPath();
  ctx.ellipse(220, 250, 300, 150, 0, 0, Math.PI, true);
  ctx.fill();

  // weed from positions
  grassPositions.forEach(({ startX, startY }) => {
    ctx.fillStyle = '#1d953f';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + 8, startY - 30);
    ctx.lineTo(startX + 4, startY);
    ctx.fill();
  });

  // TODO: clear position list at each start of mole-grid painting
  molePositions.length = 0;
};

// === setup grass meta data ===
initGrass();
// === Game asset-1: Build Moles grid to render later
const moleGrid = initMoleGrid();
// === Game asset-2: Hammer
const hammer = new SimpleHammerState();

/**
 * Main function that paint a Whac-A-Mole grid, in every frame!!
 *
 * @param {*} ctx canvas graphic context
 */
const paintMainScene = (ctx) => {
  // - Part 1 -
  drawSkyAndGrassland(ctx);

  // get the realtime hammer position
  const [hammerX, hammerY] = getCursorPositionInCanvas();

  // - Part 2: update moles state -
  moleGrid.forEach((m) => {
    // m.setDebugMode();
    m.setMousePosition(hammerX, hammerY);
    m.setHitState(isMouseDown);
    m.selectMoleAt(globalRandomMole);
    m.render(ctx);
  });
};

// ============= start code ===============

// listening mouse move...to save it's position:
document.addEventListener('mousemove', function (mouseEvent) {
  globalMouseX = mouseEvent.clientX;
  globalMouseY = mouseEvent.clientY;
});
// listening mouse pressed
document.addEventListener('mousedown', function (mouseEvent) {
  isMouseDown = true;
  hammer.setState('DOWN');
  hitSoundTrack.play();
});
// listening mouse up
document.addEventListener('mouseup', function (mouseEvent) {
  isMouseDown = false;
  hammer.setState('UP');
});

// === Start game ===
startGame(
  paintMainScene,
  function (ctx) {
    hammer.render(ctx);
  },
  function () {
    // updage random position
    // globalRandomMole = Math.floor(Math.random() * 16);
  }
);
