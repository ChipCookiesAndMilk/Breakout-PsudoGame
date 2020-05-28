export default class ImportHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
        case 80: // pause
          game.togglePause();
          break;
        case 32: // pause
          game.start();
          break;
        default:
          console.log("Use left or right key to move the paddle");
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
        case 80: // pause
          console.log("Game paused");
          break;
        case 32: // pause
          console.log("Start game");
          break;
        default:
          console.log("Use left or right key to move the paddle");
      }
    });
  }
}
