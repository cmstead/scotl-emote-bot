const pingReply = require('./actions/ping-reply');
const messageReact = require('./actions/message-react-reactions');
const moveMessage = require('./actions/move-message');
const showHelp = require('./actions/help');

const actions = [
    showHelp.action,
    pingReply.action,
    messageReact.action,
    moveMessage.action
];

const names = [
    showHelp.name,
    pingReply.name,
    messageReact.name,
    moveMessage.name

]

function runActions(client, msg, tokens) {
    actions.forEach(action => {
        if (typeof action === 'function') {
            action(client, msg, tokens);
        }
    });
}

function isActionName(name) {
    return names.includes(name);
}

module.exports = {
    isActionName,
    runActions
};