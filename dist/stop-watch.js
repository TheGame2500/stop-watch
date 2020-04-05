"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var StopWatch = /** @class */ (function () {
    function StopWatch(_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.logger, logger = _c === void 0 ? console : _c, _d = _a.loggingPrefix, loggingPrefix = _d === void 0 ? '' : _d, _e = _a.debug, debug = _e === void 0 ? false : _e, _f = _a.watchMode, watchMode = _f === void 0 ? false : _f, _g = _a.threshold, threshold = _g === void 0 ? 0 : _g, _h = _a.minLaps, minLaps = _h === void 0 ? 10 : _h;
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
        this.lastLap = now;
        return now;
    };
    return StopWatch;
}());
exports.StopWatch = StopWatch;
//# sourceMappingURL=stop-watch.js.map