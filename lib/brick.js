const defaultOptions = {
  width: 80,
  height: 22,
  x: 0,
  y: 0
};

class Brick {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.state = "unbroken";
    this.color = "#B1F3F1";
    this.width = options.width, this.height = options.height;
    this.x = options.x, this.y = options.y;
  }

  draw () {
    if (this.state === "unbroken") {
      this.context.beginPath();
      this.context.rect(this.x, this.y, this.width, this.height);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath();
    }
  }

}

export default Brick;
