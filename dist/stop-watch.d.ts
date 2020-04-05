export declare class StopWatch {
    readonly id: string;
    readonly logger: Console;
    readonly loggingPrefix: string;
    readonly debug: boolean;
    readonly start: Date;
    readonly watchMode: boolean;
    private lastLap;
    constructor({ id, logger, loggingPrefix, debug, watchMode, threshold }: {
        id?: string;
        logger?: Console;
        loggingPrefix?: string;
        debug?: boolean;
        watchMode?: boolean;
        threshold?: number;
    });
    /**
     * Logs a lap
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    lap(loggingSuffix?: string, sinceStart?: boolean): Date;
}
