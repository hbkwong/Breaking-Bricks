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

    this.rows = options.rows, this.columns = options.columns;
    this.width = options.width, this.height = options.height;
    this.brickPadding = options.brickPadding;

    this.offsetTop = 23, this.offsetLeft = 26;

    this.bricks = [];
    this.brickCount = 0;
  }

  build () {
    for (let idx = 0; idx < this.rows; idx++) {
      this.bricks[idx] = [];
      for (let idx2 = 0; idx2 < this.columns; idx2++) {
        let brickHor = idx2 * (this.width + this.brickPadding) + this.offsetLeft;
        let brickVert = idx * (this.height + this.brickPadding) + this.offsetTop;
        let options = {
          width: this.width,
          height: this.height,
          x: brickHor,
          y: brickVert
        };
        this.brickCount += 1;
        this.bricks[idx][idx2] = new Brick(this.canvas, this.context, options);
      }
    }
    return this.bricks;
  }

}

export default BrickLayout;
