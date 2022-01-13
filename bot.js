require('dotenv').config();

const dateFns = require('date-fns-tz');

const { Client } = require('discord.js');

const { nextGrandma } = require('./next-event-message');

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
next

Next Event (next):

You can ask about the next Grandma or Geyser event in the following ways.

scotl next grandma
scotl next gma
scotl next geyser

Show Emote:

scotl <emote search term>

Example: To show the Tearful Light Miner emote you can search in any of these ways:

scotl cry
scotl crying
scotl light miner
scotl tearful light miner
`);
}

function nextGeyser(time) {
    const timeTokens = time.split(':');
    const hours = parseInt(timeTokens[0]);
    const minutes = parseInt(timeTokens[1]);

    const isEvenHour = hours % 2 === 0;

    if (isEvenHour && minutes === 0) {
        return `now`;
    } else if (isEvenHour) {
        return `in 1 hour, ${60 - minutes} minutes`;
    } else {
        return `in ${60 - minutes} minutes`;
    }
}

function getCurrentPacificTime(Date) {
    const currentDate = new Date();
    const timePattern = 'HH:mm';
    const timeZone = 'America/Los_Angeles';
    return dateFns.formatInTimeZone(currentDate, timeZone, timePattern);
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
    } else if (tokens[0] === 'next') {
        const currentPacificTime = getCurrentPacificTime(Date);

        let nextEventMessage = null;

        if (['grandma', 'gma'].includes(tokens[1].toLowerCase())) {
            nextEventMessage = `Next grandma event ${nextGrandma(currentPacificTime)}`;
        } else if (tokens[1].toLowerCase() === 'geyser') {
            nextEventMessage = `Next geyser event in ${nextGeyser(currentPacificTime)}`
        } else {
            nextEventMessage = 'Next event must be either "grandma", "gma", or "geyser".';
        }

        message.reply(nextEventMessage);
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

