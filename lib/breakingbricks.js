import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 580;
  canvasEl.height = 400;

  const context = canvasEl.getContext("2d");
  const game = new Game(canvasEl, context);
  game.draw();
});
