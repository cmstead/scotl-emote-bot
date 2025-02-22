const { getCurrentPacificTime, getCurrentPacificDay, getCurrentGMTDay } = require('./datetime');
const differenceInMilliseconds = require('date-fns/differenceInMilliseconds');
const { getWeather } = require('./weather');

const oneMinuteInMs = 60 * 1000;

module.exports = function (client) {

    function sendChannelMessageAlert(alertMessage, options = {}) {
        console.log(`send message request received: ${alertMessage}`);
        client.guilds.cache.forEach((guild) => {
            guild.fetch()
                .then((fetchedGuild) => {
                    return fetchedGuild.channels.fetch();
                })
                .then((channels) => {
                    console.log('attempting to send to channel');

                    const generalChannel = channels.find((channel) => channel.name.endsWith('sky-general'))

                    if (generalChannel) {
                        console.log(`sending daily reset message to ${generalChannel.name}`);
                        generalChannel.send({
                            embeds: [{
                                description: alertMessage,
                                ...options
                            }]
                        });
                    }
                })

                .catch(function (error) {
                    console.log(`was there an error: ${error.message}`);
                });
        });
    }

    function isAfterResetTime(hour, minutes) {
        return hour % 24 < 2 && minutes > 5;
    }

    function isOkayToAlert(lastAlert, offset = 20) {
        return differenceInMilliseconds(new Date(), lastAlert) > offset * oneMinuteInMs;
    }

    function isAfterEdenReset(hour, minutes) {
        const pacificDay = getCurrentPacificDay();

        return pacificDay === 0 && isAfterResetTime(hour, minutes);
    }

    function isGMTSaturday() {
        return getCurrentGMTDay() === 6;
    }

    let lastFashionDayAlert = new Date();
    let lastGeneralChannelResetAlert = new Date();

    return function startAlertTimer() {
        setInterval(() => {
            const currentTime = getCurrentPacificTime();
            const timeTokens = currentTime.split(':');
            const hour = parseInt(timeTokens[0]);
            const minutes = parseInt(timeTokens[1]);

            if (isAfterResetTime(hour, minutes) && isOkayToAlert(lastGeneralChannelResetAlert, 130)) {
                let resetAlertMessage = [
                    'Happy reset! Visit #💡hints for information about daily quests, candles and more!',
                    '',
                    'It\'s another beautiful day in Sky!',
                    getWeather()
                ];

                if (isGMTSaturday()) {
                    sendChannelMessageAlert(`It's Saturday somewhere! Post your Stunning Saturday photos in #👗fashion!`, {
                        title: 'Stunning Saturday',
                        image: {
                            url: 'https://i.ibb.co/Jj3sSJXw/scotl-gloat.gif'
                        },
                    });
                }

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
