const { getCurrentPacificTime } = require('./datetime');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');

module.exports = function (client) {

    function sendAlert(alertMessage) {
        client.guilds.cache.forEach((guild) => {
            guild.fetch()
                .then((fetchedGuild) => {
                    return fetchedGuild.members.fetch();
                })
                .then(members =>
                    members.filter((member) => {
                        return member.roles.cache.find(role => role.name === 'SCOTL Alerts')
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

    function isNearResetTime(hour, minutes) {
        return hour === 23 && minutes >= 45;
    }

    let lastAlert = new Date();

    function triggerAlert(message) {
        sendAlert(message);
        lastAlert = new Date();
    }

    function isOkayToAlert() {
        return differenceInMilliseconds(new Date(), lastAlert) > 20 * 60 * 1000;
    }

    return function startAlertTimer() {
        setInterval(() => {
            const okayToAlert = isOkayToAlert();
            const timeTokens = getCurrentPacificTime().split(':');
            const hour = parseInt(timeTokens[0]);
            const minutes = parseInt(timeTokens[1]);

            if(isNearGeyserTime(hour, minutes) && okayToAlert) {
                triggerAlert('The next polluted geyser event is happening soon!');
            }

            if(isNearGrandmaTime(hour, minutes) && okayToAlert) {
                triggerAlert('The next grandma event is happening soon!');
            }

            if(isNearResetTime(hour, minutes)) {
                sendAlert('The next grandma event is happening soon!');
            }
        }, 15 * 60 * 1000);

        console.log('Alert timer is running!');
    }

};