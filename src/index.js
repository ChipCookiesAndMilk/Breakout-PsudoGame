import Game from "/src/game";

// get the canvas
let canvas = document.getElementById("gameScreen");
// context to draw in the canvas
let ctx = canvas.getContext("2d");
// fixed size of the 'game' dimensions
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

/* Factored into Game class */
// create a paddle obj
// let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
// instantiate the inputHandler for the gameLoop
// new InputHandler(paddle);
// create a ball obj
// let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
// instead use this:
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start(); // moved to input.js

// in order to know what was the last time
let lastTime = 0;

// Images, refactored
// let imgBall = document.getElementById("img_ball");

// the game need to be lopped
function gameLoop(timestamp) {
  // deltaTime, is difference in time
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // draw the game_area
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  // draw the paddle
  // paddle.update(deltaTime);
  // paddle.draw(ctx);

  // draw the ball
  // ctx.drawImage(imgBall, 10, 10, 25, 25);
  // ball.update(deltaTime);
  // ball.draw(ctx);

  // Instead use
  game.update(deltaTime);
  game.draw(ctx);

  // when the next frame is ready call gameLoop and pass the timestamp
  requestAnimationFrame(gameLoop);
}

// intead of gameLoop(); use for no use of condition
requestAnimationFrame(gameLoop);
