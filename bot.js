require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const emotes = require('./emotes');

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function matchAll(emote, tokens) {
    return tokens.reduce((result, token) => {
        return emote.includes(token) && result;
    }, true);
}

function listEmotes(message) {
    const availableEmotes = emotes.map(emote => emote.name);
    message.reply(`
Here are the emotes I know:

${availableEmotes.join('\n')}
        `);
}

function showHelp(message) {
    message.reply(`
Commands:

help
list

Show Emote:

scotl <emote search term>

Example: To show the Tearful Light Miner emote you can search in any of these ways:

scotl cry
scotl crying
scotl light miner
scotl tearful light miner
`);
}

function sendReponse(message, tokens) {
    const phrase = tokens.join(' ');
    const emote = emotes.find(emote => matchAll(emote.name, tokens));

    if (tokens.length === 0) {
        message.reply('you rang?');
    } else if (phrase === 'help') {
        showHelp(message);
    } else if (phrase === 'list') {
        listEmotes(message);
    } else if (typeof emote === 'object') {
        message.reply(emote.url);
    } else if(phrase.startsWith('next')) {
        message.reply(new Date());
    } else {
        message.reply('I don\'t know that one!')
    }
}

client.on('message', msg => {
    const tokens = msg.content.toLowerCase().split(' ');

    if (tokens[0] === 'scotl') {
        sendReponse(msg, tokens.slice(1));
    }
});

