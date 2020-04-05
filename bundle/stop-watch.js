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

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(2);
var StopWatch = /** @class */ (function () {
    function StopWatch(_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.logger, logger = _c === void 0 ? console : _c, _d = _a.loggingPrefix, loggingPrefix = _d === void 0 ? '' : _d, _e = _a.debug, debug = _e === void 0 ? false : _e, _f = _a.watchMode, watchMode = _f === void 0 ? false : _f, _g = _a.threshold, threshold = _g === void 0 ? 0 : _g;
        this.start = new Date();
        this.lastLap = this.start;
        this.id = id;
        this.logger = logger;
        this.loggingPrefix = loggingPrefix;
        this.debug = debug;
        this.watchMode = watchMode;
        helpers_1.validateLogger(id, debug, logger, watchMode);
    }
    /**
     * Logs a lap
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    StopWatch.prototype.lap = function (loggingSuffix, sinceStart) {
        if (loggingSuffix === void 0) { loggingSuffix = ''; }
        if (sinceStart === void 0) { sinceStart = false; }
        var now = new Date();
        var lastDate = sinceStart ? this.start : this.lastLap;
        var timePassedMS = now.valueOf() - lastDate.valueOf();
        var logText = "stop-watch" + (this.id ? " " + this.id + " " : '') + this.loggingPrefix + " " + timePassedMS + " ms since " + (sinceStart ? 'start' : 'last lap') + " " + loggingSuffix;
        this.logger[this.debug ? 'debug' : 'log'](logText);
        return now;
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

/***/ })
/******/ ]);