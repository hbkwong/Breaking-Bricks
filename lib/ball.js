const defaultOptions = {
  dx: 0,
  dy: -2,
  radius: 6,
  lowSpeed: 3,
  highSpeed: 9
};

class Ball {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.radius = options.radius;
    this.x = 0.5 * canvas.width, this.y = canvas.height - 30;
    this.dx = options.dx, this.dy = options.dy;
    this.lowSpeed = options.lowSpeed, this.highSpeed = options.highSpeed;

    this.pastAccelerate = 0;
  }

  draw () {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    this.context.fillStyle = "#FFE963";
    this.context.fill();
    this.context.closePath();
  }

  move () {
    this.y += this.dy;
    this.x += this.dx;
  }

  accelerate (stage) {
    if (stage > this.pastAccelerate) {
      this.updateAngle(this.dx *= 1.25);
      this.dy *= 1.3;
      this.pastAccelerate += 1;
    }
  }

  updateAngle (velocity) {
    let direction = (velocity <= 0) ? -1 : 1;

    if (Math.abs(velocity) <= this.lowSpeed) {
      this.dx = this.lowSpeed * direction;
    } else if (Math.abs(velocity) >= this.highSpeed) {
      this.dx = this.highSpeed * direction;
    } else {
      this.dx = velocity;
    }
  }

  resetBall () {
    this.x = 0.5 * this.canvas.width;
    this.y = this.canvas.height - 30;
    this.dx = 0;
    this.dy = -2;
    this.pastAccelerate -= 1;
  }

  checkPaddleCollision (paddle) {
    let x = Math.abs(0.5*(this.x - paddle.width - paddle.x));
    return (x <= ((0.5 * paddle.width) + this.radius));
  }

  checkBrickCollision (brick) {
    let x = Math.abs(this.x - brick.x - (0.5 * brick.width));
    let y = Math.abs(this.y - brick.y - (0.5 * brick.width));

    if (x > ((0.5 * brick.width) + this.radius) || y > ((0.5 * brick.height) + this.radius)) {
      return false;
    } else if (x <= (0.5 * brick.width) || y <= (0.5 * brick.height)) {
      return true;
    }

    let sideX = x - (0.5 * brick.width);
    let sideY = y - (0.5 * brick.height);

    return (Math.pow(this.radius, 2) >= (Math.pow(sideX, 2) + Math.pow(sideY, 2)) );
  }

  handleWallCollision () {
    let totalX = this.x + this.dx;
    let totalY = this.y + this.dy;

    if (totalX > this.canvas.width - this.radius || totalX < this.radius) {
      this.dx *= -1;
    } else if (totalY < this.radius) {
      this.dy *= -1;
    }
  }

}

export default Ball;
