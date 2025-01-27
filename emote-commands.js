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
        description: availableEmotes.join(', '),
        image: {
            url: emotes.find(emote => emote.name === 'adore').url
        }
    }

    message.author.send({
        embeds: [listEmbed]
    });
}

function findEmote(tokens) {
    return emotes.find(emote => emote.name === tokens[0].toLowerCase());
}

module.exports = {
    matchAll,
    listEmotes,
    findEmote
};