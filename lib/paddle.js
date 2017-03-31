const defaultOptions = {
  width: 76,
  height: 11
};

class Paddle {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.height = options.height, this.width = options.width;
    this.x = 0.5 * (canvas.width - this.width);
  }

  draw () {
    let newHeight = this.canvas.height - this.height;
    this.context.beginPath();
    this.context.rect(this.x, newHeight, this.width, this.height);

    this.context.fillStyle = "#FFFFFF";
    this.context.fill();
    this.context.closePath();
  }

  move (amt) {
    this.x += amt;
  }

}

export default Paddle;
