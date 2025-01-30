function reactAndReply(msg, tokens) {
    if (msg.author.id !== '925464580644294707') {
        if ((/[^a-z]*h+(j|y)*(o+|ö+|a(w|h)+)n+k+/ig).test(msg.content)) {
            msg.react('<:honk:1178124672861225000>');
        }

        if ((/[ck]rab/ig).test(msg.content)) {
            msg.react('<:dedkrab:1193212738558763029>');
        }

        if ((/krill/ig).test(msg.content)) {
            msg.react('<:pkrilleye:1062746661438369823>');
        }

        if ((/mo(th|ff)/ig).test(msg.content)) {
            msg.react('<:mothhonk:1191906094256238703>');
        }

        if((/[^a-z](cr(ing|[^a-z])|candle)/ig).test(msg.content)) {
            msg.react('🕯');
        }

        if((/[^a-z](wl(r|ing|[^a-z])|winged light)/ig).test(msg.content)) {
            msg.react('<a:MimiLight:1062747923663835147>');
        }

        const phrases = [
            'Honk?',
            'Honk!',
            'Sorry, I was busy reading your messages.',
            'https://media1.tenor.com/m/qSFhB10WHrYAAAAd/sky-cotl-heart-hands.gif',
            'https://media1.tenor.com/m/MUtpsIlO17IAAAAd/sky-cotl-faint.gif',
            'https://media1.tenor.com/m/rlDth0qT_wMAAAAd/sky-cotl-float.gif',
        ];

        if (tokens.includes('<@925464580644294707>')) {
            const messageIndex = Math.floor(Math.random() * phrases.length);
            msg.reply(phrases[messageIndex]);
        }
    }
}

module.exports = {
    reactAndReply
};