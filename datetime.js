const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

const US_PACIFIC_TIME_ZONE = 'America/Los_Angeles';
function getCurrentPacificTime() {
    const currentDate = new Date();
    const timePattern = 'HH:mm';
    return dateFnsTz.formatInTimeZone(currentDate, US_PACIFIC_TIME_ZONE, timePattern);
}

function getSundayAsZeroIndexDay(dayIndicator) {
    return parseInt(dayIndicator) % 7
}

function getCurrentPacificDay() {
    const currentDate = new Date();
    const timePattern = 'i';
    const dayIndicator = dateFnsTz.formatInTimeZone(currentDate, US_PACIFIC_TIME_ZONE, timePattern);

    return getSundayAsZeroIndexDay(dayIndicator);
}

function getCurrentGMTDay() {
    currentDate = new Date();
    const timePattern = 'i';
    const dayIndicator = dateFnsTz.format(currentDate, timePattern);

    return getSundayAsZeroIndexDay(dayIndicator);
}

function getPacificTimeDifference(expectedDateString) {
    const expectedDate = new Date(expectedDateString);
    const currentDate = new Date();

    const expectedPacificDate = dateFnsTz.utcToZonedTime(expectedDate, US_PACIFIC_TIME_ZONE);
    const currentPacificDate = dateFnsTz.utcToZonedTime(currentDate, US_PACIFIC_TIME_ZONE);

    try {
        return dateFns.differenceInHours(currentPacificDate, expectedPacificDate);
    } catch (e) {
        return -1;
    }
}

module.exports = {
    getCurrentGMTDay,
    getCurrentPacificTime,
    getCurrentPacificDay,
    getPacificTimeDifference
};