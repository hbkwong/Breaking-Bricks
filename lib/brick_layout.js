import Brick from './brick';

const defaultOptions = {
  rows: 4,
  columns: 8,
  width: 50,
  height: 11,
  brickPadding: 6
};

class BrickLayout {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.rows = options.rows, this.columns = options.columns;
    this.width = options.width, this.height = options.height;
    this.brickPadding = options.brickPadding;

    this.offsetTop = 31, this.offsetLeft = 21;

    this.bricks = new Array();
    this.brickCount = 0;
  }

  build () {
    for (let idx = 0; idx < this.rows; idx++) {
      this.bricks[idx] = new Array();
      for (let idx2 = 0; idx2 < this.columns; idx2++) {
        let upDown = idx * (this.height + this.brickPadding) + this.offsetTop;
        let leftRight = idx2 * (this.width + this.brickPadding) + this.offsetLeft;
        let options = {
          height: this.height,
          width: this.width,
          x: leftRight,
          y: upDown
        };
        this.brickCount += 1;
        this.bricks[idx][idx2] = new Brick(this.canvas, this.context, options);
      }
    }
    return this.bricks;
  }

}

export default BrickLayout;
