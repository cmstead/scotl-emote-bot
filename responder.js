const { nextGrandma, nextGeyser, nextReset } = require('./next-event-message');
const { showHelp } = require('./help');
const { listEmotes, findEmote } = require('./emote-commands');
const { getCurrentPacificTime } = require('./datetime');
const { getWeather } = require('./weather');
const emotes = require('./emotes');

function sendReponse(message, tokens) {
    const phrase = tokens.join(' ');
    const emote = findEmote(tokens);
    const firstToken = typeof tokens[0] === 'string' ? tokens[0].toLowerCase() : '';

    if (tokens.length === 0) {
        const waveUrl = emotes.find(emote => emote.name === 'wave').url;

        message.reply('\'Hi! Need help? Try "scotl help"');
        message.reply(waveUrl);
    } else if (phrase === 'help') {
        showHelp(message);
    } else if (phrase === 'list') {
        listEmotes(message);
    } else if (typeof emote === 'object') {
        message.reply(emote.url);
    } else if (firstToken === 'next') {
        const currentPacificTime = getCurrentPacificTime();

        let nextEventMessage = null;

        const eventToken = typeof tokens[1] === 'string' ? tokens[1] : '';
        if (['grandma', 'gma'].includes(eventToken.toLowerCase())) {
            nextEventMessage = `Next grandma event ${nextGrandma(currentPacificTime)}`;
        } else if (eventToken.toLowerCase() === 'geyser') {
            nextEventMessage = `Next geyser event in ${nextGeyser(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'reset') {
            nextEventMessage = `Next reset event in ${nextReset(currentPacificTime)}`
        } else {
            nextEventMessage = 'Next event must be either "grandma", "gma", "geyser", or "reset".';
        }

        message.reply(nextEventMessage);
    } else if (firstToken === 'weather') {
        message.reply(getWeather());
    }else {
        message.reply('I don\'t know that one!')
    }
}

module.exports = {
    sendReponse
};