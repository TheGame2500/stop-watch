export declare class StopWatch {
    readonly id: string;
    readonly logger: Console;
    readonly loggingPrefix: string;
    readonly debug: boolean;
    readonly start: Date;
    readonly watchMode: boolean;
    readonly minLaps: number;
    private lastLap;
    private lapTimes;
    constructor({ id, logger, loggingPrefix, debug, watchMode, minLaps }: {
        id?: string;
        logger?: Console;
        loggingPrefix?: string;
        debug?: boolean;
        watchMode?: boolean;
        minLaps?: number;
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
