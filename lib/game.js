import Paddle from './paddle';
import BrickLayout from './brick_layout';
import Ball from './ball';

class Game {

  constructor (canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.paddle = new Paddle(canvas, context);
    this.ball = new Ball(canvas, context);

    this.layout = new BrickLayout(canvas, context);

    
  }

}
