class MainState extends Phaser.State {
  init() {
    // ...
  }

  preload() {
    this.load.image('logo', './assets/phaser.png')
  }

  create() {
    const worldHeight = this.world.height
    const logoScaleFromWorld = worldHeight / 500
    // console.log(logoScaleFromWorld)
    const logo = this.add.sprite(this.world.centerX, this.world.centerY, 'logo')
    logo.scale.setTo(logoScaleFromWorld)
    logo.anchor.setTo(0.5, 0.5) // put on the center
  }

  update() {
    // ...
  }
}
const winHeight = window.innerHeight
const winWidth = window.innerWidth
const game = new Phaser.Game(winWidth, winHeight, Phaser.AUTO, 'phaser-example')
const main = new MainState()
game.state.add('Main', main, true)
