import Game from './game';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 600;
  canvasEl.height = 460;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(canvasEl, ctx);
  game.draw();
});
