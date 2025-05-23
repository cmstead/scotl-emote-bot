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

const getChannel = (client, message) => {
    const guild = client.guilds.cache.get(message.guild.id);
    return guild.channels.cache.get(message.channelId);
}

const getAllowedChannel = (channel) => reactAllow.find(allow => channel.name.endsWith(allow.channelName))

const isBotPing = (tokens) => tokens.includes(`<@${BOT_ID}>`)
const isScotlMessage = (message) => message.author.id === BOT_ID;

const canReactOrReply = (channel, message) => !isScotlMessage(message) && getAllowedChannel(channel);
const canReact = (channel) => {
    const allowedChannel = getAllowedChannel(channel);
    return allowedChannel && Math.random() < allowedChannel.tolerance
}

function allowReaction(client, message, tokens) {
    const channel = getChannel(client, message);

    return canReactOrReply(channel, message) && (canReact(channel) || isBotPing(tokens));
}

module.exports = {
    allowReaction,
    isBotPing,
    isScotlMessage,
    canReactOrReply,
    canReact,
    getChannel
};