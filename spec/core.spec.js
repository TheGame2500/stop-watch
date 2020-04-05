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
		const now = stopWatch.lap('suf', true)
		const ms = now - stopWatch.start
		const expectedLog = 'stop-watch testId pref ' + ms + ' ms since start suf'
		consoleStub.log.should.have.been.calledWith(expectedLog)
	})
	it('logs properly since lastLap', () => {
		const now = stopWatch.lap('suf')
		const ms = now - stopWatch.start
		const expectedLog = 'stop-watch testId pref ' + ms + ' ms since last lap suf'
		consoleStub.log.should.have.been.calledWith(expectedLog)
	})
}

function watcherFunctionalityTests() {
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
}