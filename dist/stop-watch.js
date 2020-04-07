"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var mean_1 = __importDefault(require("mean"));
var standard_deviation_1 = __importDefault(require("standard-deviation"));
var StopWatch = /** @class */ (function () {
    /**
     *
     * @param param0.id - stop watch id, will preƒix all the logs
     * @param param0.logger - logger; defaults to `console`; must have `log`/`debug` methods in basic mode and `warn` and `error` methods in watch mode
     * @param param0.loggingPrefix - logging prefix; will be added as a prefix to all logs
     * @param param0.debug - debug mode; will log using `debug` in basic mode
     * @param param0.watchMode - watch mode will make the stop watch only log what is important
     * @param param0.minLaps - minimum laps after which to start considering log importance; defaults to 10
     * @param param0.maxLaps - max laps to store in memory; defaults to 1000; set to 0 for unlimited, but leads to memory leak;
     */
    function StopWatch(_a) {
        var _b = _a.id, id = _b === void 0 ? '' : _b, _c = _a.logger, logger = _c === void 0 ? console : _c, _d = _a.loggingPrefix, loggingPrefix = _d === void 0 ? '' : _d, _e = _a.debug, debug = _e === void 0 ? false : _e, _f = _a.watchMode, watchMode = _f === void 0 ? false : _f, _g = _a.minLaps, minLaps = _g === void 0 ? 10 : _g, _h = _a.maxLaps, maxLaps = _h === void 0 ? 1000 : _h;
        this.start = new Date();
        this.lastLap = this.start;
        this.lapTimes = {};
        this.id = id;
        this.logger = logger;
        this.loggingPrefix = loggingPrefix;
        this.debug = debug;
        this.watchMode = watchMode;
        this.minLaps = minLaps;
        this.maxLaps = maxLaps;
        helpers_1.validateLogger(id, debug, logger, watchMode);
    }
    /**
     * Logs a lap
     * @param param0.id - lap ID. required if watchMode is true
     * @param param0.loggingSuffix - what to add as logging suffix
     * @param param0.sinceStart - whether logged time should be since start or since last lap
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
        var lapTimes = this.lapTimes[id];
        if (!lapTimes)
            return;
        if (this.maxLaps > 0 &&
            lapTimes.length >= this.maxLaps) {
            this.lapTimes[id] = lapTimes.slice(1);
        }
        return lapTimes;
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