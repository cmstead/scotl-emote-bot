const { nextGrandma, nextGeyser, nextReset, nextWeeklyReset, nextTurtle } = require('./next-event-message');
const { showHelp } = require('./help');
const { listEmotes, findEmote } = require('./emote-commands');
const { getCurrentPacificTime } = require('./datetime');
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
    } else if (phrase === 'help') {
        showHelp(message);
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
    } else if (firstToken === 'next') {
        const currentPacificTime = getCurrentPacificTime();

        let nextEventMessage = null;

        const eventToken = typeof tokens[1] === 'string' ? tokens[1] : '';
        if (['grandma', 'gma', 'granny'].includes(eventToken.toLowerCase())) {
            nextEventMessage = `Grandma is serving the next meal ${nextGrandma(currentPacificTime)}`;
        } else if (eventToken.toLowerCase() === 'geyser') {
            nextEventMessage = `The polluted geyser is erupting ${nextGeyser(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'turtle') {
            nextEventMessage = `The next turtle starts ${nextTurtle(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'reset') {
            nextEventMessage = `Next daily reset ${nextReset(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'weekly') {
            nextEventMessage = `Next weekly reset ${nextWeeklyReset(currentPacificTime)}`
        } else {
            nextEventMessage = 'Next event must be either "grandma", "gma", "geyser", "reset", "shard", "sunset", or "weekly".';
        }

        const repliedUser = message.reactions.message.mentions.repliedUser;
        const repliedUserMention = repliedUser ? `<@${repliedUser.id}> - \n` : '';

        nextEventMessage = `${repliedUserMention}${nextEventMessage}\n\n-# To show this message again, type \`scotl next ${eventToken}\``;

        const embed = {
            title: `Next ${eventToken} Event`,
            description: nextEventMessage
        };

        channel.send({
            embeds: [embed]
        });
    } else if (firstToken === 'weather') {
        message.author.send(getWeather());
    } else {
        message.author.send(`I don\'t know ${firstToken}!`);
    }

    message.delete();
}

module.exports = {
    sendReponse
};