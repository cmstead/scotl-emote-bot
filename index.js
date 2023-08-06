require('dotenv').config();
const http = require('http');

const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const { sendReponse } = require('./responder');
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

client.on('message', msg => {
    const tokens = msg.content.toLowerCase().split(' ');

    if (tokens[0] === 'scotl') {
        sendReponse(msg, tokens.slice(1));
    }
});

