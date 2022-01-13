const { assert } = require('chai');
const { nextGrandma, nextGeyser } = require('../next-event-message');

describe('SCOTL next event command', function () {
    describe('next grandma event', function () {
        it('returns now when current time matches expected event period', function () {
            const computedCurrentTime = '2:30';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns returns correct next event time on the even hour before the half hour', function () {
            const computedCurrentTime = '2:15';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 15 minutes');
        });

        it('returns returns correct next event time on the even hour after the half hour', function () {
            const computedCurrentTime = '2:37';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 53 minutes');
        });

        it('returns returns correct next event time on the odd hour before the half hour', function () {
            const computedCurrentTime = '1:27';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 3 minutes');
        });

        it('returns returns correct next event time on the odd hour after the half hour', function () {
            const computedCurrentTime = '1:42';
            const eventNotificationMessage = nextGrandma(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 48 minutes');
        });
    });

    describe('next geyser event', function () {
        it('returns now when current time matches expected event period', function () {
            const computedCurrentTime = '2:00';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'now');
        });

        it('returns returns correct next event time on the even hour', function () {
            const computedCurrentTime = '2:15';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour, 45 minutes');
        });

        it('returns returns correct next event time on the odd hour not on the hour', function () {
            const computedCurrentTime = '1:27';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 33 minutes');
        });

        it('returns returns correct next event time on the odd hour on the hour', function () {
            const computedCurrentTime = '1:00';
            const eventNotificationMessage = nextGeyser(computedCurrentTime);

            assert.equal(eventNotificationMessage, 'in 1 hour');
        });
    });
});