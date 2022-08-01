const { getCurrentPacificTime, getPacificTimeDifference, getCurrentPacificDay } = require('./datetime');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');
const { getWeather } = require('./weather');
const { nextShard } = require('./next-event-message');

const SCOTL_ALERT_ROLE = 'SCOTL Alerts';

const oneMinuteInMs = 60 * 1000;

module.exports = function (client) {

    function sendDirectMessageAlert(alertMessage) {
        client.guilds.cache.forEach((guild) => {
            guild.fetch()
                .then((fetchedGuild) => {
                    return fetchedGuild.members.fetch();
                })
                .then(members =>
                    members.filter((member) => {
                        return member.roles.cache.find(role => role.name === SCOTL_ALERT_ROLE)
                    }))
                .then((filteredMembers) => {
                    filteredMembers.forEach(member => member.send(alertMessage));
                })
                .catch(function (error) {
                    console.log(`was there an error: ${error.message}`);
                });
        });
    }

    function sendChannelMessageAlert(alertMessage) {
        console.log(`send message request received: ${alertMessage}`);
        client.guilds.cache.forEach((guild) => {
            guild.fetch()
                .then((fetchedGuild) => {
                    return fetchedGuild.channels.fetch();
                })
                .then((channels) => {
                    console.log('attempting to send to channel');

                    const generalChannel = channels.find((channel) => channel.name.endsWith('general'))

                    if (generalChannel) {
                        console.log(`sending daily reset message to ${generalChannel.name}`);
                        generalChannel.send(alertMessage);
                    }
                })

                .catch(function (error) {
                    console.log(`was there an error: ${error.message}`);
                });
        });
    }


    function isEvenHour(hour) {
        return hour % 2 === 0;
    }

    function isOddHour(hour) {
        return !isEvenHour(hour);
    }

    function isNearShardTime(hour, minutes) {
        return isEvenHour(hour) && minutes >= 40;
    }

    function isNearGeyserTime(hour, minutes) {
        return isOddHour(hour) && minutes >= 45;
    }

    function isAfterResetTime(hour, minutes) {
        return hour % 24 === 0 && minutes > 5;
    }

    function isNearForestRainbowTime(hour, minutes) {
        return [4, 16].includes(hour) && minutes > 54;
    }

    function isNearFairyRingTime(hour, minutes) {
        return minutes > 40;
    }

    function isNearSunsetTime(hour, minutes) {
        return isEvenHour(hour) && minutes > 40 && minutes < 55;
    }

    function isOkayToAlert(lastAlert, offset = 20) {
        return differenceInMilliseconds(new Date(), lastAlert) > offset * oneMinuteInMs;
    }

    function getTimeToNextHour(minutes) {
        return 60 - minutes;
    }

    function isAfterEdenReset(hour, minutes) {
        const pacificDay = getCurrentPacificDay();

        return pacificDay === 0 && isAfterResetTime(hour, minutes);
    }

    let lastShardAlert = new Date();
    let lastGeyserAlert = new Date();
    let lastRainbowAlert = new Date();
    let lastSunsetAlert = new Date();
    let lastFairyRingAlert = new Date();
    let lastGeneralChannelResetAlert = new Date();

    function pluralize(time, word) {
        return time === 1 ? word : `${word}s`;
    }

    function isRandomAlertTime(period, frequency) {
        const selectedValue = Math.floor(Math.random() * period);

        return selectedValue < frequency;
    }

    return function startAlertTimer() {
        setInterval(() => {
            const currentTime = getCurrentPacificTime();
            const timeTokens = currentTime.split(':');
            const hour = parseInt(timeTokens[0]);
            const minutes = parseInt(timeTokens[1]);

            let messagesToSend = [];

            if (isNearGeyserTime(hour, minutes) && isOkayToAlert(lastGeyserAlert)) {
                const geyserMinutes = getTimeToNextHour(minutes);
                const grandmaMinutes = geyserMinutes + 30;

                messagesToSend.push(`The polluted geyser is erupting in ${geyserMinutes} ${pluralize(geyserMinutes, 'minute')}`)
                messagesToSend.push(`Grandma is serving a meal in ${getTimeToNextHour(minutes) + 30} ${pluralize(grandmaMinutes, 'minute')}`)

                lastGeyserAlert = new Date();
            }

            if (isNearShardTime(hour, minutes) && isOkayToAlert(lastShardAlert)) {
                messagesToSend.push(`The next shard event is starting ${nextShard(currentTime)}`)

                lastShardAlert = new Date();
            }

            if (isRandomAlertTime(3, 1) && isOkayToAlert(lastRainbowAlert) && isNearForestRainbowTime(hour, minutes)) {
                sendChannelMessageAlert('Visit the forest brook _soon_ for something beautiful!');
                lastRainbowAlert = new Date();
            }

            const twelveHours = 12 * 60;

            if (isRandomAlertTime(25, 1) && isOkayToAlert(lastFairyRingAlert, twelveHours) && isNearFairyRingTime(hour, minutes)) {
                sendChannelMessageAlert('Visit the hill above the 8-player door _soon_ for a little magic!');
                lastFairyRingAlert = new Date();
            }

            if (isRandomAlertTime(25, 1) && isOkayToAlert(lastSunsetAlert, twelveHours) && isNearSunsetTime(hour, minutes)) {
                sendChannelMessageAlert('Visit Sanctuary Islands _soon_ for something wonderful!');

                lastSunsetAlert = new Date();
            }

            if (isAfterResetTime(hour, minutes) && isOkayToAlert(lastGeneralChannelResetAlert, 60)) {
                let resetAlertMessage = [
                    'Happy reset! Visit #💡hints for information about daily quests, candles and more!',
                    '',
                    'It\'s another beautiful day in Sky!',
                    getWeather()
                ];

                if (isAfterEdenReset(hour, minutes)) {
                    resetAlertMessage.push('');
                    resetAlertMessage.push('Eden is calling. If you choose that journey, take care of your ✨light✨.');
                }

                resetAlertMessage.push('');
                resetAlertMessage.push('https://c.tenor.com/mPYZe9k-16MAAAAC/sky-children-skyheart.gif');

                sendChannelMessageAlert(resetAlertMessage.join('\n'));
                lastGeneralChannelResetAlert = new Date();
            }



            if (messagesToSend.length > 0) {
                sendDirectMessageAlert(messagesToSend.join('\n'));
            }

        }, 5 * oneMinuteInMs);

        console.log('Alert timer is running!');
    }

};
