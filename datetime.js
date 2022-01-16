const dateFns = require('date-fns-tz');

function getCurrentPacificTime() {
    const currentDate = new Date();
    const timePattern = 'HH:mm';
    const timeZone = 'America/Los_Angeles';
    return dateFns.formatInTimeZone(currentDate, timeZone, timePattern);
}

module.exports = {
    getCurrentPacificTime
};