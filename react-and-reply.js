const { isBotPing } = require('./react-allow-list');

function reactAndReply(msg, tokens) {
    const candlePattern = /[^a-z]*(cr(ing)?|candles?)[^a-z]/igm;
    const wlPattern = /(wlr?|(winged light))/igm;
    const honkPattern = /[^a-z]*h+(j|y)*(o+|ö+|a(w|h)+)n+k+/ig;

    if ((honkPattern).test(msg.content)) {
        msg.react('<:honk:1178124672861225000>');
    }

    if ((/[ck]rab/igm).test(msg.content)) {
        msg.react('<:dedkrab:1193212738558763029>');
    }

    if ((/krill/igm).test(msg.content)) {
        msg.react('<:pkrilleye:1062746661438369823>');
    }

    if ((/mo(th|ff)/igm).test(msg.content) && !honkPattern.test(msg.content)) {
        msg.react('<:mothhonk:1191906094256238703>');
    }

    if (msg.content.match(candlePattern)) {
        if (Math.random() < 0.7) {
            msg.react('🕯');
        }
    }

    if (msg.content.match(wlPattern)) {
        msg.react('<a:MimiLight:1062747923663835147>');
    }

    const phrases = [
        'Honk?',
        'Honk!',
        'Sorry, I was busy reading your messages.',
        'I hear a moth in trouble! I must go!',
        '...then I said, "That\'s not a krill, that\'s my wife!"',
        'Hey look! It\'s AURORA!\n\n\n_steals a french fry_',
        'DO YOU WANT TO GO ON A MUSICAL JOURNEY??',
        'The Little Prince, Moomintroll, and the Mad Hatter walk into a bar...',
    ];

    if (isBotPing(tokens)) {
        const messageIndex = Math.floor(Math.random() * phrases.length);
        msg.reply(phrases[messageIndex]);
    }
}

module.exports = {
    reactAndReply
};