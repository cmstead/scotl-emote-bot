const pingReplyActions = require('./actions/ping-reply');
const messageReplyReactionsActions = require('./actions/message-reply-reactions');
const moveMessageAction = require('./actions/move-message');

module.exports = function runActions(client, msg, tokens) {
    pingReplyActions(client, msg, tokens);
    messageReplyReactionsActions(client, msg);
    moveMessageAction(client, msg);
}