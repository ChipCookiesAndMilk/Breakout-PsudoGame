/* paddle | brick collition detection */
export function detectCollition(ball, gameObject) {
  let topOfBall = ball.position.y;
  let bottomOfBall = ball.position.y + ball.size;

  let leftSideObj = gameObject.position.x;
  let rightSideObj = leftSideObj + gameObject.width;
  let topOfGameObj = gameObject.position.y;
  let bottomOfGameObj = gameObject.position.y + gameObject.height;

  if (
    bottomOfBall >= topOfGameObj &&
    topOfBall <= bottomOfGameObj &&
    ball.position.x >= leftSideObj &&
    ball.position.x + ball.size <= rightSideObj
  ) {
    // ball.speed.y = -ball.speed.y;
    // ball.position.y = gameObject.position.y - ball.size;
    return true;
  } else {
    return false;
  }
}
