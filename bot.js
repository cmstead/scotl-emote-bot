require('dotenv').config();

const { Client } = require('discord.js');

const { sendReponse } = require('./responder');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    const tokens = msg.content.toLowerCase().split(' ');

    if (tokens[0] === 'scotl') {
        sendReponse(msg, tokens.slice(1));
    }
});

