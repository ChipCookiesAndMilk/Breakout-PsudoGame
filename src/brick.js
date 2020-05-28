import { detectCollition } from "./collitionDetection";
export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.width = 64;
    this.height = 32;

    this.position = position;

    this.markedForDeletion = false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    if (detectCollition(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }
}
