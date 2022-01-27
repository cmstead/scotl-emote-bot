const { getCurrentPacificDay } = require('./datetime');

function getWeather() {
    const currentDay = getCurrentPacificDay();

    if(currentDay < 3) {
        return 'Today at the Treehouse we can expect to see some rain'
    } else if (currentDay > 3) {
        return 'It\'ll be cloudy, but dry today at the Treehouse';
    } else {
        return 'Expect rain in the morning, which should clear by early afternoon'
    }
}

module.exports = {
    getWeather
};