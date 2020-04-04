import { StopWatch } from './dist/stop-watch';
if (typeof window !== 'undefined') {
    window.StopWatch = StopWatch;
}
else {
    exports.StopWatch = StopWatch;
}