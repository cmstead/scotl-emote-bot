const getMoveTip = require('./move-tip.js');
const { BOT_ID } = require('../../constants.js');

const boardsMap = {
    'submit-a-tip': 'tips-board',
    'submit-bug-info': 'bug-info-board'
};

function getChannelId(client, msg, channelName) {
    const guild = client.guilds.cache.get(msg.guild.id);

    const channel = guild.channels.cache.find(channel => channel.name.endsWith(channelName));
    return channel?.id;
}

function moveMessageAction(client, msg) {
    const moveTip = getMoveTip(client);

    Object.keys(boardsMap).forEach((key) => {
        if (msg.channelId === getChannelId(client, msg, key)) {
            return moveTip.move(msg, boardsMap[key]);
        } else if (msg.channelId === getChannelId(client, msg, boardsMap[key]) && msg.author.id !== BOT_ID) {
            return msg.delete();
        }
    });
}

module.exports = {
    name: 'move-message',
    action: moveMessageAction
};