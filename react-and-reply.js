function reactAndReply(msg, tokens) {
    const guild = client.guilds.cache.get(msg.guild.id);
    const channel = guild.channels.cache.get(msg.channelId);

    const candlePattern = /[^a-z]*(cr(ing)?|candle)/igm;
    const wlPattern = /(wlr?|(winged light))/igm;
    const honkPattern = /[^a-z]*h+(j|y)*(o+|ö+|a(w|h)+)n+k+/ig;

    if (msg.author.id !== '925464580644294707'
        && !channel.name.includes('tip')
        && !channel.name.includes('suggestion')
        && !channel.name.includes('bug')
        && !channel.name.includes('therapy')
    ) {
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