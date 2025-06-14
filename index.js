require('dotenv').config();
const http = require('http');

const { Client } = require('discord.js');
const { sendReponse } = require('./responder');
const { isActionName, runActions } = require('./actionRunner');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });


const startAlertTimer = require('./alerter')(client);

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

const commandTokens = ['!scotl', 'scotl', 'scott'];

client.on('messageCreate', msg => {
    const tokens = msg.content.split(' ');
    const firstTokenLc = tokens[0].toLowerCase();
    const commandToken = commandTokens.includes(firstTokenLc) ? 'scotl' : '';

    if (commandToken === 'scotl' && !isActionName(tokens[1])) {
        sendReponse(msg, tokens.slice(1), client);
    } else {
        runActions(client, msg, tokens.slice(1), commandToken);
    }

});

process
    .on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at Promise');
    })
    .on('uncaughtException', err => {
        console.error('Uncaught Exception thrown', err);
    });