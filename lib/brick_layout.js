import Brick from './brick';

const defaultOptions = {
  rows: 4,
  columns: 8,
  width: 74,
  height: 16,
  brickPadding: 8
};

class BrickLayout {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.rows = options.rows;
    this.columns = options.columns;
    this.width = options.width;
    this.height = options.height;
    this.brickPadding = options.brickPadding;

    this.offsetTop = 40;
    this.offsetLeft = 26;

    this.bricks = [];
    this.brickCount = 0;
  }

  build () {
    for (let i = 0; i < this.rows; i++) {
      this.bricks[i] = [];
      for (let j = 0; j < this.cols; j++) {
        let brickHor = j * (this.width + this.brickPadding) + this.offsetLeft;
        let brickVert = i * (this.height + this.brickPadding) + this.offsetTop;
        let options = {
          color: "#B1F3F1",
          width: this.width,
          height: this.height,
          x: brickHor,
          y: brickVert
        };
        this.bricks[i][j] = new Brick(this.canvas, this.context, options);
        this.brickCount += 1;
      }
    }
  }

  initialBrickCount () {
    return this.brickCount;
  }

}

export default BrickLayout;
