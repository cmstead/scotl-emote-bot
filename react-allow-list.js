const reactAllow = [
    {
        channelName: 'spam',
        tolerance: 1
    },
    {
        channelName: 'meme',
        tolerance: 0.7
    },
    {
        channelName: 'general',
        tolerance: 0.2
    }
];

const BOT_ID = '925464580644294707';

const isBotPing = (tokens) => tokens.includes(`<@${BOT_ID}>`)

function allowReaction(client, message, tokens) {
    const guild = client.guilds.cache.get(message.guild.id);
    const channel = guild.channels.cache.get(message.channelId);
    const allowedChannel = reactAllow.find(allow => channel.name.endsWith(allow.channelName));

    return message.author.id !== BOT_ID && allowedChannel && (Math.random() < allowedChannel.tolerance || isBotPing(tokens));
}

module.exports = {
    allowReaction,
    isBotPing,
};