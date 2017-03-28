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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');
  canvasEl.width = 600;
  canvasEl.height = 400;

  const ctx = canvasEl.getContext('2d');
  const game = new __WEBPACK_IMPORTED_MODULE_0__game__["default"]();
  // game.draw(ctx);
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__paddle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__brick_layout__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ball__ = __webpack_require__(4);




class Game {

  constructor (canvas, context) {
    this.canvas = canvas;
    this.context = context;

    this.paddle = new __WEBPACK_IMPORTED_MODULE_0__paddle__["a" /* default */](canvas, context);
    this.ball = new __WEBPACK_IMPORTED_MODULE_2__ball__["a" /* default */](canvas, context);

    this.layout = new __WEBPACK_IMPORTED_MODULE_1__brick_layout__["a" /* default */](canvas, context);

    
  }

}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Paddle);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__brick__ = __webpack_require__(5);


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
        this.bricks[i][j] = new __WEBPACK_IMPORTED_MODULE_0__brick__["a" /* default */](this.canvas, this.context, options);
        this.brickCount += 1;
      }
    }
  }

  initialBrickCount () {
    return this.brickCount;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (BrickLayout);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {

  constructor (canvas, context, options = {}) {
    this.canvas = canvas;
    this.context = context;


  }

}

/* harmony default export */ __webpack_exports__["a"] = (Ball);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const defaultOptions = {
  state: "full",
  color: "#B1F3F1",
  width: 80,
  height: 24,
  x: 0,
  y: 0
};

class Brick {

  constructor (canvas, context, options = defaultOptions) {
    this.canvas = canvas;
    this.context = context;

    this.state = options.state;
    this.color = options.color;
    this.width = options.width;
    this.height = options.height;
    this.x = options.x;
    this.y = options.y;
  }

  draw () {
    if (this.state === "full") {
      this.context.beginPath();
      this.context.rect(this.x, this.y, this.width, this.height);
      this.context.fillStyle = this.color;
      this.context.fill();
      this.context.closePath();
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Brick);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map