const { getCurrentPacificTime, getCurrentPacificDay, getCurrentGMTDay } = require('./datetime');
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

    function sendChannelMessageAlert(alertMessage, options = {}) {
        console.log(`send message request received: ${alertMessage}`);
        client.guilds.cache.forEach((guild) => {
            guild.fetch()
                .then((fetchedGuild) => {
                    return fetchedGuild.channels.fetch();
                })
                .then((channels) => {
                    console.log('attempting to send to channel');

                    const preferredChannel = channels.find((channel) => channel?.name?.endsWith('sky-general'));
                    const selectedChannel = preferredChannel
                        ? preferredChannel
                        : channels.find((channel) => channel?.name?.endsWith('general'));

                    if (selectedChannel) {
                        console.log(`sending daily reset message to ${selectedChannel.name}`);

                        return selectedChannel.send({
                            embeds: [{
                                description: alertMessage,
                                ...options
                            }]
                        })
                            ?.then(() => {
                                console.log(`message sent to ${selectedChannel.name}`);
                            })
                            ?.catch(function (error) {
                                console.error(`error sending message to ${selectedChannel.name}: ${error}`);
                            });
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

    function isGMTSaturday() {
        return getCurrentGMTDay() === 6;
    }

    // let lastGeyserAlert = new Date();
    // let lastRainbowAlert = new Date();
    // let lastSunsetAlert = new Date();
    // let lastFairyRingAlert = new Date();
    let lastFashionDayAlert = new Date();
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

            // let messagesToSend = [];

            // if (isNearGeyserTime(hour, minutes) && isOkayToAlert(lastGeyserAlert)) {
            //     const geyserMinutes = getTimeToNextHour(minutes) + 5;
            //     const grandmaMinutes = geyserMinutes + 30;

            //     messagesToSend.push(`The polluted geyser is erupting in ${geyserMinutes} ${pluralize(geyserMinutes, 'minute')}`)
            //     messagesToSend.push(`Grandma is serving a meal in ${grandmaMinutes} ${pluralize(grandmaMinutes, 'minute')}`)

            //     lastGeyserAlert = new Date();
            // }

            // if (isRandomAlertTime(3, 1) && isOkayToAlert(lastRainbowAlert) && isNearForestRainbowTime(hour, minutes)) {
            //     sendChannelMessageAlert('Visit the forest brook _soon_ for something beautiful!');
            //     lastRainbowAlert = new Date();
            // }

            // const twelveHours = 12 * 60;

            // if (isRandomAlertTime(25, 1) && isOkayToAlert(lastFairyRingAlert, twelveHours) && isNearFairyRingTime(hour, minutes)) {
            //     sendChannelMessageAlert('Visit the hill above the 8-player door _soon_ for a little magic!');
            //     lastFairyRingAlert = new Date();
            // }

            const twentyFourHours = 24 * 60

            if (isOkayToAlert(lastFashionDayAlert, twentyFourHours) && isGMTSaturday()) {
                sendChannelMessageAlert(`It's Saturday somewhere! Post your Stunning Saturday photos in #👗fashion!`, {
                    title: 'Stunning Saturday',
                    image: {
                        url: 'https://i.ibb.co/Jj3sSJXw/scotl-gloat.gif'
                    },
                });
            }

            // if (isRandomAlertTime(25, 1) && isOkayToAlert(lastSunsetAlert, twelveHours) && isNearSunsetTime(hour, minutes)) {
            //     sendChannelMessageAlert('Visit Sanctuary Islands _soon_ for something wonderful!');

            //     lastSunsetAlert = new Date();
            // }

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

                const blurbs = [
                    'Whatever happens in Valley of Triumph, stays in Valley of Triumph.',
                    'You can\'t play sky all day if you don\'t start in the morning.',
                    'Yeti loves you!',
                    'Tell those krill to get off my lawn!',
                    'It\'s midnight, tell the chibi mafia to knock it off.',
                    'Is that a candle in your pocket or are you just happy to see me?',
                    'A little manta told me you\'re looking cute today!',
                    'Chibis: always 100% caffeinated.',
                    'Honk!',
                ];

                const selectedBlurb = blurbs[Math.floor(Math.random() * blurbs.length)];

                resetAlertMessage.push('');
                resetAlertMessage.push(`_${selectedBlurb}_`);

                const imageOptions = [
                    'https://i.ibb.co/Z11101SK/20250130-211915.gif',
                    'https://i.ibb.co/Q36VcgPv/20250130-211841.gif',
                    'https://i.ibb.co/VYycRQdz/scotl-crab.gif',
                    'https://i.ibb.co/SXtQrV8p/scotl-confetti.gif',
                    'https://i.ibb.co/39CxKV0L/high-five-scotl.gif',
                    'https://i.ibb.co/KjpPSx0z/20250130-211803.gif',
                    'https://i.ibb.co/KpDCDtHv/ezgif-2cc13e6df2fde.gif',
                    'https://i.ibb.co/gZ8htvzc/20250130-211735.gif',
                    'https://i.ibb.co/nN7gggYs/ezgif-22dbcfd380d1f.gif',
                    'https://i.ibb.co/G4dpvJy4/scotl-sparkler.gif',
                    'https://i.ibb.co/Fkj4Cvkc/ezgif-25f1968893983.gif',
                ];

                sendChannelMessageAlert(resetAlertMessage.join('\n'), {
                    title: 'It\'s Reset Time',
                    image: {
                        url: imageOptions[Math.floor(Math.random() * imageOptions.length)]
                    },
                });
                lastGeneralChannelResetAlert = new Date();
            }

        }, 5 * oneMinuteInMs);

        console.log('Alert timer is running!');
    }

};
