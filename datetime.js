const dateFns = require('date-fns-tz');

function getCurrentPacificTime() {
    const currentDate = new Date();
    const timePattern = 'HH:mm';
    const timeZone = 'America/Los_Angeles';
    return dateFns.formatInTimeZone(currentDate, timeZone, timePattern);
}

function getSundayAsZeroIndexDay(dayIndicator) {
    return parseInt(dayIndicator) % 7
}
function getCurrentPacificDay() {
    const currentDate = new Date();
    const timePattern = 'i';
    const timeZone = 'America/Los_Angeles';
    const dayIndicator = dateFns.formatInTimeZone(currentDate, timeZone, timePattern);

    return getSundayAsZeroIndexDay(dayIndicator);
}

module.exports = {
    getCurrentPacificTime,
    getCurrentPacificDay
};