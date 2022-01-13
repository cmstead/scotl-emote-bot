const { nextGrandma, nextGeyser } = require('./next-event-message');
const { showHelp } = require('./help');
const { listEmotes, findEmote } = require('./emote-commands');
const { getCurrentPacificTime } = require('./datetime');

function sendReponse(message, tokens) {
    const phrase = tokens.join(' ');
    const emote = findEmote(tokens);

    if (tokens.length === 0) {
        message.reply('you rang?');
    } else if (phrase === 'help') {
        showHelp(message);
    } else if (phrase === 'list') {
        listEmotes(message);
    } else if (typeof emote === 'object') {
        message.reply(emote.url);
    } else if (tokens[0] === 'next') {
        const currentPacificTime = getCurrentPacificTime(Date);

        let nextEventMessage = null;

        if (['grandma', 'gma'].includes(tokens[1].toLowerCase())) {
            nextEventMessage = `Next grandma event ${nextGrandma(currentPacificTime)}`;
        } else if (tokens[1].toLowerCase() === 'geyser') {
            nextEventMessage = `Next geyser event in ${nextGeyser(currentPacificTime)}`
        } else {
            nextEventMessage = 'Next event must be either "grandma", "gma", or "geyser".';
        }

        message.reply(nextEventMessage);
    } else {
        message.reply('I don\'t know that one!')
    }
}

module.exports = {
    sendReponse
};