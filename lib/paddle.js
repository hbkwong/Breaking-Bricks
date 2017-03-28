const defaultOptions = {
  width: 80,
  height: 12
};

class Paddle {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.height = options.height;
    this.width = options.width;

    this.x = 0.5 * (canvas.width - this.width);
  }

  draw () {
    let newHeight = this.canvas.height - this.height;
    this.context.beginPath();
    this.context.rect(this.x, newHeight, this.width, this.height);

    this.context.fillStyle = "#003A1A";
    this.context.fill();
    this.context.closePath();
  }

  move (dir) {
    this.x += dir;
  }

}
