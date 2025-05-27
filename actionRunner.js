const pingReplyActions = require('./actions/ping-reply');
const messageReplyReactionsActions = require('./actions/message-reply-reactions');
const moveMessageAction = require('./actions/move-message');
const showHelpAction = require('./actions/help');

const actions = [
    showHelpAction,
    pingReplyActions,
    messageReplyReactionsActions,
    moveMessageAction
];

module.exports = function runActions(client, msg, tokens) {
    actions.forEach(action => {
        if (typeof action === 'function') {
            action(client, msg, tokens);
        }
    });
}