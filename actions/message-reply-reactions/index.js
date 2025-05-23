const { canReactOrReply, canReact, getChannel } = require('../../react-allow-list');

module.exports = function messageReplyReactionsActions(client, msg) {
    const channel = getChannel(client, msg);

    if (canReactOrReply(channel, msg) && canReact(channel, msg)) {
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

    }
}