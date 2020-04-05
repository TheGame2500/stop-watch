import { validateLogger } from './helpers'

export class StopWatch {
    readonly id: string
    readonly logger: Console
    readonly loggingPrefix: string
    readonly debug: boolean
    readonly start = new Date()
    readonly watchMode: boolean
    private lastLap = this.start

    constructor({
        id= '',
        logger=console,
        loggingPrefix='',
        debug=false,
        watchMode=false,
        threshold=0
    }) {
        this.id = id
        this.logger = logger
        this.loggingPrefix = loggingPrefix
        this.debug = debug
        this.watchMode = watchMode

        validateLogger(id, debug, logger, watchMode)
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

        const logText = `stop-watch${
            this.id ? ` ${this.id} `: ''
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