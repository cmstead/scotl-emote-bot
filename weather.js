const { getCurrentPacificDay } = require('./datetime');

function getWeather() {
    const currentDay = getCurrentPacificDay();

    return currentDay < 4
        ? 'Expect rain at the Treehouse today'
        : 'Expect dry weather at the Treehouse today';
}

module.exports = {
    getWeather
};