const dateFnsTz = require('date-fns-tz');
const dateFns = require('date-fns');

function getCurrentPacificTime() {
    const currentDate = new Date();
    const timePattern = 'HH:mm';
    const timeZone = 'America/Los_Angeles';
    return dateFnsTz.formatInTimeZone(currentDate, timeZone, timePattern);
}

function getSundayAsZeroIndexDay(dayIndicator) {
    return parseInt(dayIndicator) % 7
}

function getCurrentPacificDay() {
    const currentDate = new Date();
    const timePattern = 'i';
    const timeZone = 'America/Los_Angeles';
    const dayIndicator = dateFnsTz.formatInTimeZone(currentDate, timeZone, timePattern);

    return getSundayAsZeroIndexDay(dayIndicator);
}

function getPacificTimeDifference(expectedDateString) {
    const expectedDate = new Date(expectedDateString);
    const currentDate = new Date();
    const timeZone = 'America/Los_Angeles';


    const expectedPacificDate = dateFnsTz.utcToZonedTime(expectedDate, timeZone);
    const currentPacificDate = dateFnsTz.utcToZonedTime(currentDate, timeZone);

    try {
        return dateFns.differenceInHours(currentPacificDate, expectedPacificDate);
    } catch (e) {
        return -1;
    }
}

module.exports = {
    getCurrentPacificTime,
    getCurrentPacificDay,
    getPacificTimeDifference
};