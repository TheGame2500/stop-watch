# stop-watch
```javascript
import { StopWatch } from 'clever-stop-watch'
```

## Basic mode (watchMode == false)
Just your basic stop-watch. Usage:

```javascript
const stopWatch = new StopWatch({
    id: 'optionalID',
    logger: console,
    loggingPrefix: 'log prefix'
    debug: false, // will use console.debug if true
})

async function jobWhichTakesAWhileAndRepeatsALot() {
    await subTask1() // which takes ~100ms
    stopWatch.lap({ loggingSufix: 'subTask1', sinceStart: false })
    // logs "stop-watch optionalID logPrefix 100 ms since last lap subTask1"

    await subTask2() // which takes ~200ms
    stopWatch.lap({ loggingSufix: 'subTask2', sinceStart: true })
    // logs "stop-watch optionalID logPrefix 300 ms since start subTask1"
}
```

## Watcher mode (watchMode == true)
If you don't want to spam your logs with the basic usage,
watcherMode will only log what seems out of place.

```javascript
const stopWatch = new StopWatch({
    id: 'optionalID',
    logger: console,
    loggingPrefix: 'log prefix'
    watchMode: true,
    minLaps: 5, // minimum laps after which logging is enabled
    maxLaps: 1000 // max lap times to store in memory; 0 for unlimited; default is 1000;
})

async function jobWhichTakesAWhileAndRepeatsALot() {
    await subTask1() // which takes ~120ms, after previous subTask1 called took ~100ms
    stopWatch.lap({ id:'subTask1', loggingSufix: 'subTask1'})
    // warns "stop-watch optionalID logPrefix 100 ms since last lap subTask1"

    await subTask2() // which takes ~200ms, after previous subTask2 called took ~100ms,
    stopWatch.lap({ id: 'subTask2', loggingSufix: 'subTask2')
    // errors "stop-watch optionalID logPrefix 300 ms since start subTask2"
}
```
