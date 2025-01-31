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

const botId = '925464580644294707';


function allowReaction(client, message) {
    const guild = client.guilds.cache.get(message.guild.id);
    const channel = guild.channels.cache.get(message.channelId);
    const allowedChannel = reactAllow.find(allow => channel.name.endsWith(allow.channelName));

    return message.author.id !== botId && allowedChannel && Math.random() < allowedChannel.tolerance;
}

module.exports = {
    allowReaction,
};