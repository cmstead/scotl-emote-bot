const { listEmotes, findEmote } = require('./emote-commands');
const { getWeather } = require('./weather');
const emotes = require('./emotes');
const { sendInfo } = require('./send-info');

function sendReponse(message, tokens, client) {
    const phrase = tokens.join(' ');
    const emote = findEmote([tokens[0]?.toLowerCase()]);
    const firstToken = typeof tokens[0] === 'string' ? tokens[0].toLowerCase() : '';
    const guild = client.guilds.cache.get(message.guild.id);
    const channel = guild.channels.cache.get(message.channelId);

    if (tokens.length === 0) {
        const waveUrl = emotes.find(emote => emote.name === 'wave').url;

        message.author.send(`'Hi! Need help? Try "scotl help"

${waveUrl}`);
    } else if (phrase === 'list') {
        listEmotes(message);
    } else if (['info', 'share-info'].includes(firstToken)) {
        sendInfo(message, tokens, client);
    } else if (typeof emote === 'object') {

        const repliedUser = message.reactions.message.mentions.repliedUser;
        const repliedUserMention = repliedUser ? `<@${repliedUser.id}> - ` : '';
        const emoteUrlIndex = Math.floor(Math.random() * emote.urls.length);

        const embed = {
            author: {
                name: message.author.username,
                icon_url: message.author.avatarURL()
            },
            description: `<@${message.author.id}> says:\n${repliedUserMention}${tokens.slice(1).join(' ')}\n-# \`${emote.name}\``,
            image: {
                url: emote.urls[emoteUrlIndex]
            }
        };

        channel.send({
            embeds: [embed]
        });
    } else if (firstToken === 'weather') {
        message.author.send(getWeather());
    } else {
        message.author.send(`I don\'t know ${firstToken}!`);
    }

    // message.delete();
}

module.exports = {
    sendReponse
};