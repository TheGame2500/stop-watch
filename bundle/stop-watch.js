/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_stop_watch__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dist_stop_watch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dist_stop_watch__);

if (typeof window !== 'undefined') {
    window.StopWatch = __WEBPACK_IMPORTED_MODULE_0__dist_stop_watch__["StopWatch"];
}
else {
    exports.StopWatch = __WEBPACK_IMPORTED_MODULE_0__dist_stop_watch__["StopWatch"];
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var mean_1 = __importDefault(__webpack_require__(3));
var standard_deviation_1 = __importDefault(__webpack_require__(4));
var StopWatch = /** @class */ (function () {
    function StopWatch(_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.logger, logger = _c === void 0 ? console : _c, _d = _a.loggingPrefix, loggingPrefix = _d === void 0 ? '' : _d, _e = _a.debug, debug = _e === void 0 ? false : _e, _f = _a.watchMode, watchMode = _f === void 0 ? false : _f, _g = _a.minLaps, minLaps = _g === void 0 ? 10 : _g;
        this.start = new Date();
        this.lastLap = this.start;
        this.lapTimes = {};
        this.id = id;
        this.logger = logger;
        this.loggingPrefix = loggingPrefix;
        this.debug = debug;
        this.watchMode = watchMode;
        this.minLaps = minLaps;
        helpers_1.validateLogger(id, debug, logger, watchMode);
    }
    /**
     * Logs a lap
     * @param id - lap ID. required if watchMode is true
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    StopWatch.prototype.lap = function (_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.loggingSuffix, loggingSuffix = _c === void 0 ? '' : _c, _d = _a.sinceStart, sinceStart = _d === void 0 ? false : _d;
        if (this.watchMode)
            return this.watchLap({ id: id, loggingSuffix: loggingSuffix });
        return this.basicLap({ loggingSuffix: loggingSuffix, sinceStart: sinceStart });
    };
    StopWatch.prototype.basicLap = function (_a) {
        var _b = _a.loggingSuffix, loggingSuffix = _b === void 0 ? '' : _b, _c = _a.sinceStart, sinceStart = _c === void 0 ? false : _c;
        var now = new Date();
        var lastDate = sinceStart ? this.start : this.lastLap;
        var timePassedMS = now.valueOf() - lastDate.valueOf();
        var logText = this.getLogText(timePassedMS, sinceStart, loggingSuffix);
        this.logger[this.debug ? 'debug' : 'log'](logText);
        this.lastLap = now;
        return now;
    };
    StopWatch.prototype.watchLap = function (_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.loggingSuffix, loggingSuffix = _c === void 0 ? '' : _c;
        var now = new Date();
        if (!id || !id.toString()) {
            throw new TypeError("stop-watch " + this.id + " watch mode laps need lap id");
        }
        var lastLap = this.lastLap;
        this.lastLap = now;
        var diffMS = now.valueOf() - lastLap.valueOf();
        var lapTimes = this.getLapTimes(id);
        if (!lapTimes || !lapTimes.length || lapTimes.length < this.minLaps) {
            this.pushLapTime(id, diffMS);
            return now;
        }
        var stdDevsAway = this.getStdDevsAway(lapTimes, diffMS);
        var logMethod = this.getLogMethod(stdDevsAway);
        this.pushLapTime(id, diffMS);
        if (!logMethod)
            return now;
        var logText = this.getLogText(diffMS, false, loggingSuffix);
        this.logger[logMethod](logText);
        return now;
    };
    StopWatch.prototype.getLogMethod = function (stdDevsAway) {
        if (stdDevsAway < 1)
            return;
        if (stdDevsAway < 2)
            return 'warn';
        return 'error';
    };
    StopWatch.prototype.getStdDevsAway = function (lapTimes, currentLap) {
        var lastLapsMean = mean_1.default(lapTimes);
        var stdDev = standard_deviation_1.default(lapTimes);
        var currentWithoutMean = currentLap - lastLapsMean;
        return currentWithoutMean / stdDev;
    };
    StopWatch.prototype.getLapTimes = function (id) {
        return this.lapTimes[id];
    };
    StopWatch.prototype.pushLapTime = function (id, lapTime) {
        this.lapTimes[id] = this.lapTimes[id] || [];
        this.lapTimes[id].push(lapTime);
    };
    StopWatch.prototype.getLogText = function (timePassedMS, sinceStart, loggingSuffix) {
        return "stop-watch" + (this.id ? " " + this.id + " " : '') + this.loggingPrefix + " " + timePassedMS + " ms since " + (sinceStart ? 'start' : 'last lap') + " " + loggingSuffix;
    };
    return StopWatch;
}());
exports.StopWatch = StopWatch;
//# sourceMappingURL=stop-watch.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogger = function (id, debug, logger, watchMode) {
    var prefix = "stop-watch with id " + id;
    if (!logger)
        throw new TypeError(prefix + " was passed no logger");
    var noWarnOrErr = !logger.warn || !logger.error;
    if (watchMode && noWarnOrErr) {
        throw new TypeError(prefix + " was passed a logger with no '" + (!logger.warn ? 'warn' : 'error') + "' method");
    }
    if (debug && !logger.debug) {
        throw new TypeError(prefix + " was passed a logger with no 'debug' method");
    }
    if (!logger.log) {
        throw new TypeError(prefix + " was passed a logger with no 'log' method");
    }
};
//# sourceMappingURL=helpers.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Get the mean interval. Example:
 *
 *     mean([111, 222, 333, 444, 555]) // => 333
 *
 * @param {array} intervals
 * @returns {number}
 */
module.exports = function(intervals) {
  if (!intervals.length) {
    return 0
  }

  return (intervals.reduce(function(prev, curr) {
    return prev + curr
  }) / intervals.length)
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var variance = __webpack_require__(5);

/**
 * Return the standard deviation of `arr` with optional callback `fn(val, i)`.
 *
 * @param {Array} arr
 * @param {Function} [fn]
 * @return {Number}
 * @api public
 */

module.exports = function(arr, fn){
  if (0 == arr.length) return null;
  return Math.sqrt(variance(arr, fn));
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var average = __webpack_require__(6);

module.exports = function variance(values) {
    'use strict';
    
    var mean = average(values);
    
    function sum(a, b) {
        var diff = b - mean;
        return a + (diff * diff);
    }

    return values.reduce(sum, 0) / values.length;
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function average(values) {
    'use strict';
    
    return values.reduce(sum, 0) / values.length;
};

function sum(a, b) {
    return a + b;
}

/***/ })
/******/ ]);