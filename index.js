require('dotenv').config();
const http = require('http');

const { Client } = require('discord.js');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const { sendReponse } = require('./responder');

const startAlertTimer = require('./alerter')(client);
const moveTip = require('./move-tip')(client);

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

client.on('messageCreate', msg => {
    const tokens = msg.content.split(' ');

    const guild = client.guilds.cache.get(msg.guild.id);
    const submitATipChannel = guild.channels.cache.find(channel => channel.name.endsWith('submit-a-tip'));
    const tipsBoardChannel = guild.channels.cache.find(channel => channel.name.endsWith('tips-board'));
    const submitATipChannelId = submitATipChannel?.id;
    const tipsBoardChannelId = tipsBoardChannel?.id;

    const firstTokenLc = tokens[0].toLowerCase();

    if (['scotl', 'scott'].includes(firstTokenLc)) {
        sendReponse(msg, tokens.slice(1), client);
    } else if((/\shj?onk/ig).test(msg.content)) {
        msg.react('Honk!');
    } else if (msg.channelId === submitATipChannelId) {
        moveTip.move(msg);
    } else if (msg.channelId === tipsBoardChannelId && msg.author.id !== '925464580644294707') {
        console.log(msg);
        msg.delete();
    }
});

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise');
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err);
  });