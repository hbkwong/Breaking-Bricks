import Paddle from './paddle';
import BrickLayout from './brick_layout';
import Ball from './ball';
import Brick from './brick';

class Game {

  constructor (canvas, context) {
    this.canvas = canvas, this.context = context;

    this.paddle = new Paddle(canvas, context);
    this.ball = new Ball(canvas, context);
    this.layout = new BrickLayout(canvas, context);

    this.lives = 3;
    this.gameEnded = false;
    this.result = "L";

    this.bricks = this.layout.build();
    this.brickCount = this.layout.initialBrickCount();

    $(document).mousemove(this.handleMouseMove.bind(this));
  }

  handleMouseMove (e) {
    let distance = e.clientX - this.canvas.offsetLeft;

    if (0 < distance && this.canvas.width > distance) {
      this.paddle.x = distance - (0.5 * this.paddle.width);
    }
  }

  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ball.draw();
    this.paddle.draw();

    if (this.gameEnded) {
      this.renderResult();
      this.ball.dx = 0, this.ball.dy = 0;
    } else {
      this.ball.move();
      this.renderLives();
    }

    this.renderBricks();

    this.detectCollisions();
    requestAnimationFrame(this.draw.bind(this));

    this.ball.handleWallCollision();
    this.handlePaddleCollision();
    this.handleLifeLoss();
  }

  handlePaddleCollision () {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius - this.paddle.height) {
      if (this.ball.checkPaddleCollision(this.paddle)) {
        let midPaddle = this.paddle.x + (0.5 * this.paddle.width);

        if (midPaddle > this.ball.x) {
          this.ball.updateAngle(-(Math.abs(this.ball.dx) * (3/4 + (midPaddle - this.ball.x)/(1/2 * this.paddle.width))));
        } else {
          this.ball.updateAngle(Math.abs(this.ball.dx) * (3/4 + (this.ball.x - midPaddle)/(1/2 * this.paddle.width)));
        }

        this.ball.dy *= -1;
      }
    }
  }

  detectCollisions () {
    for (let idx = 0; idx < this.bricks.length; idx++) {
      for (let idx2 = 0; idx2 < this.bricks[idx].length; idx2++) {
        let brick = this.bricks[idx][idx2];
        if (brick.state === "unbroken") {
          if (this.ball.checkBrickCollision(brick)) {
            brick.state = "broken";
            this.brickCount -= 1;
            this.ball.dy *= -1;
            if (this.brickCount === 0) {
              this.result = "W";
              this.gameEnded = true;
            }
          }
        }
      }
    }
  }

  handleLifeLoss () {
    if (this.ball.y + this.ball.dy > this.canvas.height) {
      this.lives -= 1;
      if (this.lives === 0) {
        this.result = "L";
        this.gameEnded = true;
      } else {
        this.ball.resetBall();
      }
    }
  }

  renderBricks () {
    for (let idx = 0; idx < this.bricks.length; idx++) {
      for (let idx2 = 0; idx2 < this.bricks[idx].length; idx2++) {
        this.bricks[idx][idx2].draw();
      }
    }
  }

  renderLives () {
    // this.context.font
    this.context.fillStyle = "#4e8948";
    this.context.fillText(`Lives: ${this.lives}`, this.canvas.width - 574, 16);

  }

  renderResult () {
    // this.context.font
    this.context.fillStyle = "#4e8948";
    this.context.fillText(`Result: ${this.result}`, 280, 230);
  }

}

export default Game;
