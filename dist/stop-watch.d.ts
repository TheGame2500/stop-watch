export declare class StopWatch {
    readonly id: string;
    readonly logger: Console;
    readonly loggingPrefix: string;
    readonly debug: boolean;
    readonly start: Date;
    readonly watchMode: boolean;
    readonly minLaps: number;
    private lastLap;
    constructor({ id, logger, loggingPrefix, debug, watchMode, threshold, minLaps }: {
        id?: string;
        logger?: Console;
        loggingPrefix?: string;
        debug?: boolean;
        watchMode?: boolean;
        threshold?: number;
        minLaps?: number;
    });
    /**
     * Logs a lap
     * @param id - lap ID
     * @param loggingSuffix - what to add as logging suffix
     * @param sinceStart - whether logged time should be since start or since last lap
     * @returns {Date} - returns current date for convenience
     */
    lap({ id, loggingSuffix, sinceStart }: {
        id?: string;
        loggingSuffix?: string;
        sinceStart?: boolean;
    }): Date;
}
