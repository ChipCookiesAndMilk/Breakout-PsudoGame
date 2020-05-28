import { detectCollition } from "./collitionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");

    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.size = 25;

    this.resetBall();
  }

  resetBall() {
    this.speed = { x: 3, y: 3 };
    this.position = { x: 100, y: 300 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // walls collition detection
    if (this.position.x < 0 || this.position.x + this.size > this.gameWidth)
      this.speed.x = -this.speed.x;
    // roof collition detection
    if (this.position.y < 0) this.speed.y = -this.speed.y;
    // ball has reached the ground
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lifes--;
      this.resetBall();
    }

    // bricks collition detection
    if (detectCollition(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}
