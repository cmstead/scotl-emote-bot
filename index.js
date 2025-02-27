require('dotenv').config();
const http = require('http');

const { Client } = require('discord.js');
const { sendReponse } = require('./responder');
const { reactAndReply } = require('./react-and-reply');
const { allowReaction } = require('./react-allow-list');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });


const startAlertTimer = require('./alerter')(client);
const moveTip = require('./tips/move-tip')(client);

const port = process.env.PORT ?? 8080;

let clientName = null;

function requestListener(_, response) {
    const message = clientName === null
        ? 'Unable to connect'
        : `Worker Started: ${clientName}`;

    response.writeHead(200);
    response.end(message);
}

const server = http.createServer(requestListener);

server.listen(port, function () {
    console.log('Server started');
})

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    clientName = client.user.tag;

    console.log(`Logged in as ${client.user.tag}!`);

    startAlertTimer();
});

function getChannelId(msg, channelName) {
    const guild = client.guilds.cache.get(msg.guild.id);

    const channel = guild.channels.cache.find(channel => channel.name.endsWith(channelName));
    return channel?.id;
}

client.on('messageCreate', msg => {
    const tokens = msg.content.split(' ');
    const firstTokenLc = tokens[0].toLowerCase();

    if (['!scotl', 'scotl', 'scott'].includes(firstTokenLc)) {
        return sendReponse(msg, tokens.slice(1), client);
    } else if (allowReaction(client, msg, tokens)) {
        return reactAndReply(msg, tokens);
    }

    if (msg.channelId === getChannelId(msg, 'submit-a-tip')) {
        return moveTip.move(msg);
    } else if (msg.channelId === getChannelId(msg, 'tips-board') && msg.author.id !== '925464580644294707') {
        return msg.delete();
    }

    if (msg.channelId === getChannelId(msg, 'submit-bug-info')) {
        return moveTip.move(msg, 'bug-info-board');
    } else if (msg.channelId === getChannelId(msg, 'bug-info-board') && msg.author.id !== '925464580644294707') {
        return msg.delete();
    }
});

process
    .on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at Promise');
    })
    .on('uncaughtException', err => {
        console.error('Uncaught Exception thrown', err);
    });