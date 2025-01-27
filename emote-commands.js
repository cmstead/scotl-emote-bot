const emotes = require('./emotes');

function matchAll(emote, tokens) {
    return tokens.reduce((result, token) => {
        return emote.includes(token) && result;
    }, true);
}

function listEmotes(message) {
    const availableEmotes = emotes.map(emote => emote.name);
    availableEmotes.sort();

    const listEmbed = {
        title: 'SCOTL Emotes',
        description: availableEmotes.map(emoteName => `- scotl _${emoteName}_`).join('\n'),
        image: {
            url: emotes.find(emote => emote.name === 'adore').url
        }
    }

    message.author.send({
        embeds: [listEmbed]
    });
}

function findEmote(tokens) {
    return emotes.find(emote => matchAll(emote.name, tokens));
}

module.exports = {
    matchAll,
    listEmotes,
    findEmote
};