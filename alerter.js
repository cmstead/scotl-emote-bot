const { getCurrentPacificTime, getPacificTimeDifference } = require('./datetime');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');
const { getWeather } = require('./weather');

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


    function isNearGrandmaTime(hour, minutes) {
        return hour % 2 === 0 && minutes >= 15 && minutes < 30;
    }

    function isNearGeyserTime(hour, minutes) {
        return hour % 2 === 1 && minutes >= 45;
    }

    function isNearDragonTime(hour, minutes) {
        const endDate = "February 7, 2022 0:00:00";

        return hour % 2 === 1 && minutes >= 45 && getPacificTimeDifference(endDate);
    }

    function isNearResetTime(hour, minutes) {
        return hour === 23 && minutes >= 45;
    }

    function isAfterResetTime(hour, minutes) {
        return hour % 24 === 0 && minutes > 5;
    }

    function isNearForestRainbowTime(hour, minutes) {
        return [4, 16].includes(hour) && minutes > 54;
    }

    function isOkayToAlert(lastAlert, offset = 20) {
        return differenceInMilliseconds(new Date(), lastAlert) > offset * oneMinuteInMs;
    }

    function getTimeToNextHour(minutes) {
        return 60 - minutes;
    }

    let lastGeyserAlert = new Date();
    let lastGrandmaAlert = new Date();
    let lastResetAlert = new Date();
    let lastRainbowAlert = new Date();
    let lastDragonAlert = new Date();
    let lastGeneralChannelResetAlert = new Date();

    return function startAlertTimer() {
        setInterval(() => {
            const timeTokens = getCurrentPacificTime().split(':');
            const hour = parseInt(timeTokens[0]);
            const minutes = parseInt(timeTokens[1]);

            const sendRandomAlert = Math.floor(Math.random() * 3) > 1;

            let messagesToSend = [];

            if (isOkayToAlert(lastDragonAlert) && isNearDragonTime(hour, minutes)) {
                messagesToSend.push(`The Auspicious spirit will be visiting in ${getTimeToNextHour(minutes)} minutes`)
                lastDragonAlert = new Date();
            }
            
            if (isNearGeyserTime(hour, minutes) && isOkayToAlert(lastGeyserAlert)) {
                messagesToSend.push(`The polluted geyser is erupting in ${getTimeToNextHour(minutes)} minutes`)
                lastGeyserAlert = new Date();
            }
            
            if (isNearGeyserTime(hour, minutes) && isOkayToAlert(lastGrandmaAlert)) {
                messagesToSend.push(`Grandma is serving a meal in ${getTimeToNextHour(minutes) + 30} minutes`)
                lastGrandmaAlert = new Date();
            }
            
            if (isNearResetTime(hour, minutes) && isOkayToAlert(lastResetAlert)) {
                messagesToSend.push(`Daily reset is happening in ${getTimeToNextHour(minutes)} minutes`)
                lastResetAlert = new Date();
            }

            if (sendRandomAlert && isOkayToAlert(lastRainbowAlert) && isNearForestRainbowTime(hour, minutes)) {
                sendDirectMessageAlert('Visit the forest brook _soon_ for something beautiful!');
                lastRainbowAlert = new Date();
            }

            if (isAfterResetTime() && isOkayToAlert(lastGeneralChannelResetAlert, 60)) {
                const resetAlertMessage = [
                    'Happy reset! Visit #💡hints for information about daily quests, candles and more!',
                    '',
                    'It\'s another beautiful day in Sky!',
                    getWeather()
                ];

                sendChannelMessageAlert(resetAlertMessage.join('\n'));
                lastGeneralChannelResetAlert = new Date();
            }

            if(messagesToSend.length > 0) {
                sendDirectMessageAlert(messagesToSend.join('\n'));
            }

        }, 5 * oneMinuteInMs);

        console.log('Alert timer is running!');
    }

};