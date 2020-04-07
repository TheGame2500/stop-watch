export declare class StopWatch {
    readonly id: string;
    readonly logger: Console;
    readonly loggingPrefix: string;
    readonly debug: boolean;
    readonly start: Date;
    readonly watchMode: boolean;
    readonly minLaps: number;
    readonly maxLaps: number;
    private lastLap;
    private lapTimes;
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
    constructor({ id, logger, loggingPrefix, debug, watchMode, minLaps, maxLaps, }: {
        id?: string;
        logger?: Console;
        loggingPrefix?: string;
        debug?: boolean;
        watchMode?: boolean;
        minLaps?: number;
        maxLaps?: number;
    });
    /**
     * Logs a lap
     * @param id - lap ID. required if watchMode is true
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    lap({ id, loggingSuffix, sinceStart }: {
        id?: string;
        loggingSuffix?: string;
        sinceStart?: boolean;
    }): Date;
    private basicLap;
    private watchLap;
    private getLogMethod;
    private getStdDevsAway;
    private getLapTimes;
    private pushLapTime;
    private getLogText;
}
