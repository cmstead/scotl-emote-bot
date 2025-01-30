function reactAndReply(msg) {
    if ((/[^a-z]*hj?(o|ö)nk/ig).test(msg.content)) {
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

    if(tokens.includes('<@925464580644294707>')){
        msg.reply('Honk?');
    }
}

module.exports = {
    reactAndReply
};