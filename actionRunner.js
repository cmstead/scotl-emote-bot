const pingReply = require('./actions/ping-reply');
const messageReact = require('./actions/message-react-reactions');
const moveMessage = require('./actions/move-message');
const showHelp = require('./actions/help');
const nextEvent = require('./actions/next-event');

const actionDefinitions = [
    showHelp,
    nextEvent,
    pingReply,
    messageReact,
    moveMessage
];

const actions = actionDefinitions.map((definition) => definition.action);
const names = actionDefinitions.map((definition) => definition.name)

function runActions(client, msg, tokens, commandToken) {
    actions.forEach(action => {
        if (typeof action === 'function') {
            action(client, msg, tokens, commandToken);
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