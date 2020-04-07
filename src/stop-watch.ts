import { validateLogger } from './helpers'
import mean from 'mean'
import standardDeviation from 'standard-deviation'

export class StopWatch {
    readonly id: string
    readonly logger: Console
    readonly loggingPrefix: string
    readonly debug: boolean
    readonly start = new Date()
    readonly watchMode: boolean
    readonly minLaps: number
    readonly maxLaps: number;
    private lastLap = this.start
    private lapTimes = {}

    /**
     *
     * @param id - stop watch id, will preƒix all the logs
     * @param logger - logger; defaults to `console`; must have `log`/`debug` methods in basic mode and `warn` and `error` methods in watch mode
     * @param loggingPrefix - logging prefix; will be added as a prefix to all logs
     * @param debug - debug mode; will log using `debug` in basic mode
     * @param watchMode - watch mode will make the stop watch only log what is important
     * @param minLaps - minimum laps after which to start considering log importance; defaults to 10
     * @param maxLaps - max laps to store in memory; defaults to 1000; set to 0 for unlimited, but leads to memory leak;
     */
    constructor({
        id = '',
        logger = console,
        loggingPrefix = '',
        debug = false,
        watchMode = false,
        minLaps = 10,
        maxLaps = 1000,
    }) {
        this.id = id
        this.logger = logger
        this.loggingPrefix = loggingPrefix
        this.debug = debug
        this.watchMode = watchMode
        this.minLaps = minLaps
        this.maxLaps = maxLaps
        validateLogger(id, debug, logger, watchMode)
    }

    /**
     * Logs a lap
     * @param id - lap ID. required if watchMode is true
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    lap({ id = '', loggingSuffix = '', sinceStart=false }):Date {
        if (this.watchMode) return this.watchLap({ id, loggingSuffix })
        return this.basicLap({ loggingSuffix, sinceStart })
    }

    private basicLap({ loggingSuffix = '', sinceStart=false }):Date {
        const now: Date = new Date()
        let lastDate = sinceStart ? this.start : this.lastLap
        const timePassedMS = now.valueOf() - lastDate.valueOf()

        const logText = this.getLogText(timePassedMS, sinceStart, loggingSuffix)

        this.logger[this.debug ? 'debug' : 'log'](logText)
        this.lastLap = now
        return now
    }

    private watchLap({ id = '', loggingSuffix = '' }): Date {
        const now = new Date()
        if (!id || !id.toString()) {
            throw new TypeError(`stop-watch ${this.id} watch mode laps need lap id`)
        }

        const lastLap = this.lastLap
        this.lastLap = now
        const diffMS = now.valueOf() - lastLap.valueOf()

        const lapTimes = this.getLapTimes(id)
        if (!lapTimes || !lapTimes.length || lapTimes.length < this.minLaps) {
            this.pushLapTime(id, diffMS)
            return now;
        }

        const stdDevsAway = this.getStdDevsAway(lapTimes, diffMS)
        const logMethod = this.getLogMethod(stdDevsAway)

        this.pushLapTime(id, diffMS)
        if (!logMethod) return now

        const logText = this.getLogText(diffMS, false, loggingSuffix)
        this.logger[logMethod](logText)

        return now
    }

    private getLogMethod(stdDevsAway:number): void|'warn'|'error' {
        if (stdDevsAway < 1) return
        if (stdDevsAway < 2) return 'warn'
        return 'error'
    }

    private getStdDevsAway(lapTimes:[number], currentLap:number): number {
        const lastLapsMean = mean(lapTimes)
        const stdDev = standardDeviation(lapTimes)

        const currentWithoutMean = currentLap - lastLapsMean
        return currentWithoutMean / stdDev
    }
    private getLapTimes(id: string): [number] {
        const lapTimes: [number] = this.lapTimes[id]
        if (!lapTimes) return

        if (
            this.maxLaps > 0 &&
            lapTimes.length >= this.maxLaps
        ) {
            this.lapTimes[id] = lapTimes.slice(1)
        }
        return lapTimes
    }

    private pushLapTime(id: string, lapTime: number): void {
        this.lapTimes[id] = this.lapTimes[id] || []
        this.lapTimes[id].push(lapTime)
    }

    private getLogText(timePassedMS:number, sinceStart:boolean, loggingSuffix:string) {
        return `stop-watch${
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
    }
}