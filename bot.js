require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const emotes = require('./emotes');

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function sendReponse(message, tokens) {
    const phrase = tokens.join(' ');
    const emote = emotes.find(emote => emote.name.includes(phrase));

    if(tokens.length === 0) {
        message.reply('you rang?');
    } else if(phrase === 'list') {
        const availableEmotes = emotes.map(emote => emote.name);
        message.reply(`
Here are the emotes I know:

${availableEmotes.join('\n')}
        `)
    } else if(typeof emote === 'object'){
        message.reply(emote.url);
    } else {
        message.reply('I don\'t know that one!')
    }
}

client.on('message', msg => {
    const tokens = msg.content.toLowerCase().split(' ');

    if(tokens[0] === 'scotl') {
        sendReponse(msg, tokens.slice(1));
    }
});

