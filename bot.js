require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

const { sendReponse } = require('./responder');
const startAlertTimer = require('./alerter')(client);

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    startAlertTimer();
});

client.on('message', msg => {
    const tokens = msg.content.toLowerCase().split(' ');

    if (tokens[0] === 'scotl') {
        sendReponse(msg, tokens.slice(1));
    }
});

