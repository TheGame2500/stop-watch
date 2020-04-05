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