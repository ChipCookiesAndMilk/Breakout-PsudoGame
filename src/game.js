// in order to use our class Paddle
import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
// import Brick from "/src/brick";
import { buildLevel, level1, level2, level3, level4 } from "/src/levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAME_OVER: 3,
  NEW_LEVEL: 4,
  END_GAME: 5
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    // set the state of the game
    this.gameState = GAME_STATE.MENU;
    // create a paddle obj
    this.paddle = new Paddle(this);
    // create a ball obj
    this.ball = new Ball(this);
    // initialize the array
    this.gameObjs = [];
    this.bricks = [];
    this.lifes = 1;
    this.levels = [level1, level2, level3, level4];
    this.currentLevel = 0;
    // score obtained
    this.score = 0;
    // if a block was removed then score++
    this.prevLen = 0;
    this.newLen = 0;
    // instantiate the inputHandler for the gameLoop
    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState !== GAME_STATE.MENU &&
      this.gameState !== GAME_STATE.NEW_LEVEL
    )
      return;

    // brick
    // let brick = new Brick(this, { x: 20, y: 20 });
    // this.brick = new Brick(this);
    // let bricks = [];
    // let bricks = buildLevel(this, level1); // instead
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.prevLen = this.bricks.length;
    this.ball.resetBall();
    /* moved into levels
      for (let i = 0; i < 15; i++) {
        bricks.push(new Brick(this, { x: i * 52, y: 30 }));
      }
      */
    // objects array
    // this.gameObjs = [this.ball, this.paddle, ...bricks]; instead
    this.gameObjs = [this.ball, this.paddle];
    this.gameState = GAME_STATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lifes === 0) {
      this.gameState = GAME_STATE.GAME_OVER;
    }
    if (
      this.gameState === GAME_STATE.MENU ||
      this.gameState === GAME_STATE.PAUSED ||
      this.gameState === GAME_STATE.GAME_OVER
    )
      return;

    // check if there is any brick left from the current level
    if (this.bricks.length === 0) {
      if (this.currentLevel === 3) {
        this.gameState = GAME_STATE.END_GAME;
        return;
      }
      this.gameState = GAME_STATE.NEW_LEVEL;
      this.currentLevel++;
      this.lifes++;
      this.ball.speed.x *= 10;
      this.ball.speed.y *= 10;
      this.paddle.width -= 10;
      this.paddle.height -= 5;
      this.start();
    }

    // draw the paddle
    // this.paddle.update(deltaTime);
    // draw the ball
    // this.ball.update(deltaTime);
    // when using the bricks[] we add the array of the bricks and the array of the prev objs
    //this.gameObjs.forEach(object => object.update(deltaTime));
    [...this.gameObjs, ...this.bricks].forEach(object =>
      object.update(deltaTime)
    );
    // delete gameObj
    // this.gameObjs = this.gameObjs.filter(object => !object.markedForDeletion); now it is only needed to check for the state of the bricks
    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    this.newLen = this.bricks.length;
    if (this.newLen !== this.prevLen) {
      this.score += 5;
      this.prevLen = this.newLen;
    }
  }

  displayStats(ctx) {
    ctx.font = "20px Verdana";
    ctx.fillStyle = "#515151";
    ctx.textAlign = "right";
    ctx.fillText("Lifes: " + this.lifes, this.gameWidth - 50, 25);
    ctx.fillText("Points: " + this.score, this.gameWidth - 50, 50);
  }

  draw(ctx) {
    // this.paddle.draw(ctx);
    // this.ball.draw(ctx);
    // this.gameObjs.forEach(object => object.draw(ctx)); same in here the bricks was added to the prev array
    [...this.gameObjs, ...this.bricks].forEach(object => object.draw(ctx));
    // draw current lifes and score obtained
    this.displayStats(ctx);

    if (this.gameState === GAME_STATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(1, 204, 184, 0.8)";
      ctx.fill();

      ctx.font = "50px Verdana";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(100,0,0, 0.7)";
      ctx.fill();

      ctx.font = "80px Verdana";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0, 1)";
      ctx.fill();

      ctx.font = "100px Verdana";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAME_STATE.END_GAME) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(240, 66, 55, 1)";
      ctx.fill();

      ctx.font = "100px Verdana";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("CONGRATS!", this.gameWidth / 2, this.gameHeight / 2 - 15);
      ctx.font = "50px Verdana";
      ctx.fillText(
        "You beat all the levels",
        this.gameWidth / 2,
        this.gameHeight / 2 + 25
      );
    }
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED)
      this.gameState = GAME_STATE.RUNNING;
    else this.gameState = GAME_STATE.PAUSED;
  }
}
