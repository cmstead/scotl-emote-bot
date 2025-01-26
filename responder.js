const { nextGrandma, nextGeyser, nextReset, nextWeeklyReset, nextShard, nextSunset } = require('./next-event-message');
const { showHelp } = require('./help');
const { listEmotes, findEmote } = require('./emote-commands');
const { getCurrentPacificTime } = require('./datetime');
const { getWeather } = require('./weather');
const emotes = require('./emotes');

function sendReponse(message, tokens, client) {
    const phrase = tokens.join(' ');
    const emote = findEmote([tokens[0].toLowerCase()]);
    const firstToken = typeof tokens[0] === 'string' ? tokens[0].toLowerCase() : '';

    if (tokens.length === 0) {
        const waveUrl = emotes.find(emote => emote.name === 'wave').url;

        message.author.send(`'Hi! Need help? Try "scotl help"

${waveUrl}`);
    } else if (phrase === 'help') {
        showHelp(message);
    } else if (phrase === 'list') {
        listEmotes(message);
    } else if (typeof emote === 'object') {
        const guild = client.guilds.cache.get(message.guild.id);
        const channel = guild.channels.cache.get(message.channelId);

        const embed = {
            image: {
                url: emote.url
            }
        };

        channel.send({
            content: `<@${message.author.id}> says:\n${tokens.slice(1).join(' ')}\n\n`,
            embeds: [embed]
        });
    } else if (firstToken === 'next') {
        const currentPacificTime = getCurrentPacificTime();

        let nextEventMessage = null;

        const eventToken = typeof tokens[1] === 'string' ? tokens[1] : '';
        if (['grandma', 'gma'].includes(eventToken.toLowerCase())) {
            nextEventMessage = `Grandma is serving the next meal ${nextGrandma(currentPacificTime)}`;
        } else if (eventToken.toLowerCase() === 'geyser') {
            nextEventMessage = `The polluted geyser is erupting ${nextGeyser(currentPacificTime)}`
            // } else if (eventToken.toLowerCase() === 'shard') {
            //     nextEventMessage = `The next shard event starts ${nextShard(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'sunset') {
            nextEventMessage = `The next sunset starts ${nextSunset(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'reset') {
            nextEventMessage = `Next daily reset ${nextReset(currentPacificTime)}`
        } else if (eventToken.toLowerCase() === 'weekly') {
            nextEventMessage = `Next weekly reset ${nextWeeklyReset(currentPacificTime)}`
        } else {
            nextEventMessage = 'Next event must be either "grandma", "gma", "geyser", "reset", "shard", "sunset", or "weekly".';
        }

        message.author.send(nextEventMessage);
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