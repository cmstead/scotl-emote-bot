const { isBotPing, canReactOrReply, getChannel } = require('../../react-allow-list');

function pingReplyActions(client, msg, tokens, firstToken) {
    const channel = getChannel(client, msg);

    if (canReactOrReply(channel, msg) && isBotPing([firstToken, ...tokens])) {
        const phrases = [
            'Honk?',
            'Honk!',
            'Sorry, I was busy reading your messages.',
            'I hear a moth in trouble! I must go!',
            '...then I said, "That\'s not a krill, that\'s my wife!"',
            'Hey look! It\'s AURORA!\n\n\n_steals a french fry_',
            'DO YOU WANT TO GO ON A MUSICAL JOURNEY??',
            'The Little Prince, Moomintroll, and the Mad Hatter walk into a bar...',
            'Did someone say _CORN_??',
            'Don\'t make me bring down the bean hammer!'
        ];

        const messageIndex = Math.floor(Math.random() * phrases.length);
        msg.reply(phrases[messageIndex]);
    }
}

module.exports = {
    name: 'ping-reply',
    action: pingReplyActions
};