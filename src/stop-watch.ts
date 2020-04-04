
export class StopWatch {
    readonly id: string
    readonly logger: Console
    readonly loggingPrefix: string
    readonly debug: boolean
    readonly start = new Date()
    private lastLap = this.start;

    constructor({
        id= '',
        logger=console,
        loggingPrefix='',
        debug=false
    }) {
        this.id = id
        this.logger = logger
        this.loggingPrefix = loggingPrefix
        this.debug = debug

        if (!logger || !logger.log) {
            throw new TypeError(`stop-watch with id ${id || null} was passed a logger with no log method`)
        }
    }

    /**
     * Logs a lap
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    lap(loggingSuffix='', sinceStart=false):Date {
        const now: Date = new Date()
        let lastDate = sinceStart ? this.start : this.lastLap
        const timePassedMS = now.valueOf() - lastDate.valueOf()

        const logText = `stop-watch ${
            this.id ? ` id ${this.id} `: ''
        }${
            this.loggingPrefix
        } ${
            timePassedMS
        } ms since ${
            sinceStart ? 'start' : 'last lap'
        } ${
            loggingSuffix
        }`

        this.logger[this.debug ? 'debug' : 'log'](logText)
        return now
    }
    }