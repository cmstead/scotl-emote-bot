const { getCurrentPacificTime, getPacificTimeDifference } = require('./datetime');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');

const SCOTL_ALERT_ROLE = 'SCOTL Alerts';

const oneMinuteInMs = 60 * 1000;

module.exports = function (client) {

    function sendAlert(alertMessage) {
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

    function isNearForestRainbowTime(hour, minutes) {
        return [4, 16].includes(hour) && minutes > 54;
    }

    let lastAlert = new Date();
    let lastResetAlert = new Date();
    let lastRainbowAlert = new Date();
    let lastDragonAlert = new Date();

    function triggerAlert(message) {
        sendAlert(message);
        lastAlert = new Date();
    }

    function triggerResetAlert() {
        sendAlert('Daily reset is happening soon!');
        lastResetAlert = new Date();
    }

    function isOkayToAlert(lastAlert) {
        return differenceInMilliseconds(new Date(), lastAlert) > 20 * oneMinuteInMs;
    }

    return function startAlertTimer() {
        setInterval(() => {
            const okayToAlert = isOkayToAlert(lastAlert);
            const timeTokens = getCurrentPacificTime().split(':');
            const hour = parseInt(timeTokens[0]);
            const minutes = parseInt(timeTokens[1]);

            const sendRandomAlert = Math.floor(Math.random() * 3) > 1;

            if (isNearGeyserTime(hour, minutes) && okayToAlert) {
                triggerAlert('The next polluted geyser event is happening soon!');
            }

            if (isNearGrandmaTime(hour, minutes) && okayToAlert) {
                triggerAlert('The next grandma event is happening soon!');
            }

            if (isNearResetTime(hour, minutes) && isOkayToAlert(lastResetAlert)) {
                triggerResetAlert();
            }

            if(sendRandomAlert && isOkayToAlert(lastRainbowAlert) && isNearForestRainbowTime(hour, minutes)) {
                triggerAlert('Visit the forest brook _soon_ for something beautiful!');
                lastRainbowAlert = new Date();
            }

            if(isNearDragonTime(hour, minutes)) {
                triggerAlert('The next Days of Fortune Auspicious Spirit event is happening soon!');
                lastDragonAlert = new Date();
            }
        }, 5 * oneMinuteInMs);

        console.log('Alert timer is running!');
    }

};