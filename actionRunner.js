const pingReplyActions = require('./actions/ping-reply');
const messageReplyReactionsActions = require('./actions/message-reply-reactions');

module.exports = function runActions(client, msg, tokens) {
    pingReplyActions(client, msg, tokens);
    messageReplyReactionsActions(client, msg);
}