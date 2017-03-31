/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    this.width = options.width, this.height = options.height;
    this.x = options.x, this.y = options.y;

    this.state = "unbroken";
    this.color = "#B1F3F1";
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

/* harmony default export */ __webpack_exports__["a"] = (Brick);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paddle__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__brick_layout__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ball__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__brick__ = __webpack_require__(0);





class Game {

  constructor (canvas, context) {
    this.canvas = canvas, this.context = context;

    this.paddle = new __WEBPACK_IMPORTED_MODULE_0__paddle__["a" /* default */](canvas, context);
    this.ball = new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */](canvas, context);
    this.layout = new __WEBPACK_IMPORTED_MODULE_1__brick_layout__["a" /* default */](canvas, context);

    this.lives = 3;
    this.gameEnded = false;
    this.result = "L";

    this.bricks = this.layout.build();
    this.brickCount = this.layout.initialBrickCount();

    $(document).mousemove(this.handleMouseMove.bind(this));

  }

  restart () {
    const that = this;
    document.addEventListener('keydown', function(e) {
      e.preventDefault();
      if (window.localStorage) {
        window.localStorage.clear();
      }
      switch(e.keyCode) {
        case 32:
          that.lives = 0;
          const canvasEl = document.getElementsByTagName("canvas")[0];
          canvasEl.width = 600;
          canvasEl.height = 460;

          const context = canvasEl.getContext("2d");
          const game = new Game(canvasEl, context);
          game.draw();
        default:
          return;
      }
    });
  }

  handleMouseMove (e) {
    let distance = e.clientX - this.canvas.offsetLeft;

    if (0 < distance && this.canvas.width > distance) {
      this.paddle.x = distance - (0.5 * this.paddle.width);
    }
  }

  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ball.draw();
    this.paddle.draw();

    if (this.gameEnded) {
      this.renderResult();
      this.ball.dx = 0, this.ball.dy = 0;
    } else {
      this.ball.move();
      this.renderLives();
    }

    this.renderBricks();

    this.detectCollisions();
    requestAnimationFrame(this.draw.bind(this));

    this.ball.handleWallCollision();
    this.handlePaddleCollision();
    this.handleLifeLoss();
    // this.restart();
  }

  handlePaddleCollision () {
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius - this.paddle.height) {
      if (this.ball.checkPaddleCollision(this.paddle)) {
        let midPaddle = this.paddle.x + (0.5 * this.paddle.width);

        if (midPaddle > this.ball.x) {
          this.ball.updateAngle(-(Math.abs(this.ball.dx) * (3/4 + (midPaddle - this.ball.x)/(1/2 * this.paddle.width))));
        } else {
          this.ball.updateAngle(Math.abs(this.ball.dx) * (3/4 + (this.ball.x - midPaddle)/(1/2 * this.paddle.width)));
        }

        this.ball.dy *= -1;
      }
    }
  }

  detectCollisions () {
    for (let idx = 0; idx < this.bricks.length; idx++) {
      for (let idx2 = 0; idx2 < this.bricks[idx].length; idx2++) {
        let brick = this.bricks[idx][idx2];
        if (brick.state === "unbroken") {
          if (this.ball.checkBrickCollision(brick)) {
            brick.state = "broken";
            this.brickCount -= 1;
            this.ball.dy *= -1;
            if (this.brickCount === 0) {
              this.result = "W";
              this.gameEnded = true;
            }
          }
        }
      }
    }
  }

  handleLifeLoss () {
    if (this.ball.y + this.ball.dy > this.canvas.height) {
      this.lives -= 1;
      if (this.lives === 0) {
        this.result = "L";
        this.gameEnded = true;
      } else {
        this.ball.resetBall();
      }
    }
  }

  renderBricks () {
    for (let idx = 0; idx < this.bricks.length; idx++) {
      for (let idx2 = 0; idx2 < this.bricks[idx].length; idx2++) {
        this.bricks[idx][idx2].draw();
      }
    }
  }

  renderLives () {
    // this.context.font
    this.context.fillStyle = "#4e8948";
    this.context.fillText(`Lives: ${this.lives}`, this.canvas.width - 574, 16);

  }

  renderResult () {
    // this.context.font
    this.context.fillStyle = "#4e8948";
    this.context.fillText(`Result: ${this.result} (press SPACE to restart)`, 234, 230);
    this.restart();
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const defaultOptions = {
  dx: 3,
  dy: -3,
  radius: 7,
  lowSpeed: 4,
  highSpeed: 10
};

class Ball {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.radius = options.radius;
    this.x = 0.5 * canvas.width, this.y = canvas.height - 32;
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
      this.dy *= 1.4;
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
    this.y = this.canvas.height - 32;
    this.dx = 3;
    this.dy = -3;
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

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 600;
  canvasEl.height = 460;

  const context = canvasEl.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */](canvasEl, context);
  game.draw();
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick__ = __webpack_require__(0);


const defaultOptions = {
  rows: 1,
  columns: 1,
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

  initialBrickCount () {
    return this.brickCount;
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
        this.bricks[idx][idx2] = new __WEBPACK_IMPORTED_MODULE_0__brick__["a" /* default */](this.canvas, this.context, options);
      }
    }
    return this.bricks;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (BrickLayout);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

    this.context.fillStyle = "#4e8948";
    this.context.fill();
    this.context.closePath();
  }

  move (amt) {
    this.x += amt;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map