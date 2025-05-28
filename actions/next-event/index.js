const { getCurrentPacificTime } = require('../../datetime');
const { nextGrandma, nextGeyser, nextTurtle, nextReset, nextWeeklyReset } = require('./next-event-message');

function getEventMessage(eventToken) {
    const currentPacificTime = getCurrentPacificTime();

    if (['grandma', 'gma', 'granny'].includes(eventToken.toLowerCase())) {
        return `Grandma is serving the next meal ${nextGrandma(currentPacificTime)}`;
    } else if (eventToken.toLowerCase() === 'geyser') {
        return `The polluted geyser is erupting ${nextGeyser(currentPacificTime)}`
    } else if (['turtle', 'sunset'].includes(eventToken.toLowerCase())) {
        return `The next turtle starts ${nextTurtle(currentPacificTime)}`
    } else if (eventToken.toLowerCase() === 'reset') {
        return `Next daily reset ${nextReset(currentPacificTime)}`
    } else if (eventToken.toLowerCase() === 'weekly') {
        return `Next weekly reset ${nextWeeklyReset(currentPacificTime)}`
    } else {
        return 'Next event must be either "grandma", "gma", "geyser", "sunset", "turtle", "reset", or "weekly".';
    }
}

function nextEventAction(_, message, tokens) {
    const firstToken = tokens.length ? tokens[0].toLowerCase() : '';
    const eventToken = typeof tokens[1] === 'string' ? tokens[1] : '';
    const channel = message.channel;

    if (firstToken === 'next') {
        const nextEventMessageBase = getEventMessage(eventToken);
        const repliedUser = message.reactions.message.mentions.repliedUser;
        const repliedUserMention = repliedUser ? `<@${repliedUser.id}> - \n` : '';

        const nextEventMessage = `${repliedUserMention}${nextEventMessageBase}\n\n-# To show this message again, type \`scotl next ${eventToken}\``;

        const embed = {
            title: `Next ${eventToken} Event`,
            description: nextEventMessage
        };

        channel.send({
            embeds: [embed]
        });
    }
}

module.exports = {
    name: 'next',
    action: nextEventAction
};