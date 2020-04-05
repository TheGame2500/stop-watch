//Add Jasmine Tests Here
const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
const { should } = chai
const { StopWatch } = require('../dist/stop-watch')
chai.use(sinonChai)
chai.use(chaiAsPromised)
should()

describe('stop-watch', () => {
	describe('basic functionality', basicFunctionalityTests)
	describe('watcher functionality', watcherFunctionalityTests)
})

function basicFunctionalityTests() {
	it('throws error if improper logger is passed', () => {
		try{
			new StopWatch({})
		} catch (ex) {
			ex.should.not.be.undefined
		}
	})
	const consoleStub = {
		log: sinon.stub(),
	}
	const stopWatch = new StopWatch({
		id: 'testId',
		logger: consoleStub,
		loggingPrefix: 'pref',
	})

	beforeEach(() => {
		consoleStub.log.reset()
	})

	it('logs properly since start', () => {
		const now = stopWatch.lap({
			loggingSuffix:'suf',
			sinceStart: true
		})
		const ms = now - stopWatch.start
		const expectedLog = 'stop-watch testId pref ' + ms + ' ms since start suf'
		consoleStub.log.should.have.been.calledWith(expectedLog)
	})
	it('logs properly since lastLap', () => {
		const firstNow = stopWatch.lap({ loggingSuffix:'suf'})
		const secondNow = stopWatch.lap({ loggingSuffix:'suf'})
		const ms = secondNow - firstNow
		const expectedLog = 'stop-watch testId pref ' + ms + ' ms since last lap suf'
		consoleStub.log.should.have.been.calledWith(expectedLog)
	})
}

function watcherFunctionalityTests() {
	const consoleStub = {
		log: sinon.stub(),
		warn: sinon.stub(),
		error: sinon.stub(),
	}
	beforeEach(() => {
		consoleStub.log.reset()
		consoleStub.warn.reset()
		consoleStub.error.reset()
	})

	it('throws error if watch-mode and warn or error not present on logger', () => {
		try {
			new StopWatch({
				watchMode: true,
				logger: {}
			})
		} catch (ex) {
			ex.message.should.include('warn')
		}
	})

	it('throws error if watch-mode and no id passed to lap', () => {
		let ex = { message: '' };
		try {
			const stopWatch = new StopWatch({
				watchMode: true,
				logger: consoleStub,
			})

			stopWatch.lap({})
		} catch (exception) {
			ex = exception
		}
		ex.message.should.include('watch mode laps need lap id')
	})

	it('does not log anything before minThreshold laps', () => {
		const stopWatch = new StopWatch({
			logger: consoleStub,
			watchMode: true,
			minLaps: 10
		})

		for (let i = 1; i <= 10; i++) {
			stopWatch.lap({ id: 'lapID'})
		}

		consoleStub.log.should.not.have.been.called
		consoleStub.warn.should.not.have.been.called
		consoleStub.error.should.not.have.been.called
	})

	const waitMs = ms => new Promise(resolve => setTimeout(resolve, ms))

	describe('standard deviation', () => {
		beforeEach(() => {
			consoleStub.log.reset()
			consoleStub.warn.reset()
			consoleStub.error.reset()
		})

		const MS_ARRAY = [25,25,25,50,25,50,50,50,50,50]
		const MEAN = 40
		const STD_DEV = 12.247448713916

		const awaitLaps = async msArray => {
			const stopWatch = new StopWatch({
				watchMode: true,
				minLaps: msArray.length - 1 // only log for last value
			})

			for (const ms of msArray) {
				await waitMs(ms)
				stopWatch.lap({ id: 'suf'})
			}
		}

		it('does not log if < 1 standard deviation away from mean time between laps', async () => {
			await awaitLaps(MS_ARRAY)
			consoleStub.log.should.not.have.been.called
			consoleStub.warn.should.not.have.been.called
			consoleStub.error.should.not.have.been.called
		})
		it('warns if between 1 and 2 standard deviations away from mean time between laps', async () => {
			const warnArray = [...MS_ARRAY, MEAN + 1.5 * STD_DEV]
			await awaitLaps(MS_ARRAY)
			consoleStub.log.should.not.have.been.called
			consoleStub.warn.should.have.been.called
			consoleStub.error.should.not.have.been.called
		})
		it('errors if between >2 standard deviations away from mean time between laps', async () => {
			const warnArray = [...MS_ARRAY, MEAN + 1.5 * STD_DEV]
			await awaitLaps(MS_ARRAY)
			consoleStub.log.should.not.have.been.called
			consoleStub.warn.should.not.have.been.called
			consoleStub.error.should.have.been.called
		})
	})
}