const reactAllow = [
    {
        channelName: 'spam',
        tolerance: 1
    }
];

const botId = '925464580644294707';


function allowReaction(client, message) {
    const guild = client.guilds.cache.get(msg.guild.id);
    const channel = guild.channels.cache.get(message.channelId);
    const allowedChannel = reactAllow.find(allow => allow.channelName === channel.name);

    return message.author.id !== botId && allowedChannel && Math.random() < allowedChannel.tolerance;
}

module.exports = {
    allowReaction
};