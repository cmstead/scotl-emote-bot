const { getCurrentPacificDay } = require('./datetime');

function getWeather() {
    const currentDay = getCurrentPacificDay();

    return currentDay < 4
        ? 'Today at the Treehouse we can expect to see some rain'
        : 'It\'ll be cloudy, but dry today at the Treehouse';
}

module.exports = {
    getWeather
};