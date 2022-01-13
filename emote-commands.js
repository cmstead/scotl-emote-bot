const emotes = require('./emotes');

function matchAll(emote, tokens) {
    return tokens.reduce((result, token) => {
        return emote.includes(token) && result;
    }, true);
}

function listEmotes(message) {
    const availableEmotes = emotes.map(emote => emote.name);
    message.reply(`
Here are the emotes I know:

${availableEmotes.join('\n')}
        `);
}

function findEmote(tokens) {
    return emotes.find(emote => matchAll(emote.name, tokens));
}

module.exports = {
    matchAll,
    listEmotes,
    findEmote
};