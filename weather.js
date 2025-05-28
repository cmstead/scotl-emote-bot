const { getCurrentPacificDay } = require('./datetime');

function getWeather() {
    const currentDay = getCurrentPacificDay();

    if(currentDay < 4) {
        return 'Today at the Treehouse we can expect to see some rain'
    } else {
        return 'It\'ll be cloudy, but dry today at the Treehouse';
    }
}

module.exports = {
    getWeather
};