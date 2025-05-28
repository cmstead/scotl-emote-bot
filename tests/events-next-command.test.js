const { assert } = require('chai');
const { nextGrandma, nextGeyser, nextReset, nextShard } = require('../actions/next-event/next-event-message');

describe('SCOTL next event command', function () {
    describe('next grandma event', function () {
        it('returns now when current time matches expected event period', function () {
            const computedCurrentTime = '2:35';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns returns correct next event time on the even hour before the half hour', function () {
            const computedCurrentTime = '2:15';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 20 minutes');
        });

        it('returns returns correct next event time on the even hour after the half hour', function () {
            const computedCurrentTime = '2:37';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 58 minutes');
        });

        it('returns returns correct next event time on the odd hour before the half hour', function () {
            const computedCurrentTime = '1:27';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 8 minutes');
        });

        it('returns returns correct next event time on the odd hour after the half hour', function () {
            const computedCurrentTime = '1:42';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 53 minutes');
        });
    });

    describe('next shard event', function () {
        it('returns now when current time matches expected event period', function () {
            const computedCurrentTime = '2:50';
            const eventNotificationMessage = nextShard(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns returns correct next event time during the even hour before the event begins', function () {
            const computedCurrentTime = '2:40';
            const eventNotificationMessage = nextShard(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 10 minutes');
        });

        it('returns returns correct next event time on the even hour after the fifty minute mark', function () {
            const computedCurrentTime = '2:57';
            const eventNotificationMessage = nextShard(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 53 minutes');
        });

        it('returns returns correct next event time on the odd hour', function () {
            const computedCurrentTime = '1:00';
            const eventNotificationMessage = nextShard(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 50 minutes');
        });

        it('returns returns correct next event time on the odd hour after the fifty minute mark', function () {
            const computedCurrentTime = '1:52';
            const eventNotificationMessage = nextShard(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 58 minutes');
        });
    });

    describe('next geyser event', function () {
        it('returns now when current time matches expected event period', function () {
            const computedCurrentTime = '2:05';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns returns correct next event time on the even hour', function () {
            const computedCurrentTime = '2:15';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 50 minutes');
        });

        it('returns returns correct next event time on the odd hour not on the hour', function () {
            const computedCurrentTime = '1:27';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 38 minutes');
        });

        it('returns returns correct next event time on the odd hour on the hour', function () {
            const computedCurrentTime = '1:05';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour');
        });
    });

    describe('next reset event', function () {
        it('returns now at midnight pacific', function () {
            const currentComputedTime = '00:00';
            const eventNotificationMessage = nextReset(currentComputedTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns correct time until reset when not midnight', function () {
            const currentComputedTime = '3:28';
            const eventNotificationMessage = nextReset(currentComputedTime);

            assert.equal(eventNotificationMessage, 'in 20 hours, 32 minutes');
        });

        it('returns correct time until reset when not midnight at the even hour', function () {
            const currentComputedTime = '4:00';
            const eventNotificationMessage = nextReset(currentComputedTime);

            assert.equal(eventNotificationMessage, 'in 20 hours');
        });
    });
});