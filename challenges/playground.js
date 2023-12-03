const canvas = document.getElementById('codePresenter')
const ctx = canvas.getContext('2d')

ctx.fillStyle = 'yellow'
ctx.strokeStyle = 'red'
ctx.lineWidth = 4

function drawCircle(
  startX,
  startY,
  radius,
  fillStyle = '#e0edf9',
  strokeStyle = '#009ad6',
) {
  if (fillStyle) {
    ctx.fillStyle = fillStyle
  }
  if (strokeStyle) {
    ctx.strokeStyle = strokeStyle
  }

  ctx.beginPath()
  ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fill()
}
