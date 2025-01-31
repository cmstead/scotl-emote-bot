const emotes = require('./emotes.js');

const helpEmbed = {
    title: 'SCOTL Bot Quick Reference',
    fields: [

        {
            name: 'Commands',
            value: `
- \`scotl help\` : Show this help message
- \`scotl list\` : List all available emotes
- \`scotl <emote-name> <message>\` : Show an emote, optionally you can include a message
- \`scotl next <event-name>\` : Get info about the next event
- \`scotl weather\` : Get the weather at the Treehouse`,
        },
        {
            name: 'Emotes',
            value: `
\`scotl <emote-name> <message>\`

_Examples_

\`scotl cry\`
\`scotl confetti\`
\`scotl giveup\``
        },
        {
            name: 'Next Event',
            value: `
\`scotl next <event-name>\`

You can ask about the next upcoming daily events this way:

- \`scotl next grandma|gma|granny\`
- \`scotl next geyser\`
- \`scotl next reset\`
- \`scotl next turtle\`
- \`scotl next weekly\``
        },
        {
            name: 'Thank You',
            value: `
Thanks to all who have contributed to SCOTL Bot! A special thank you to the following folks for their work in contributing images and ideas as well as contributing to my education so the bot can improve over time:

- @Crow
- @Pepperly/Perpa
- @Marie
- @Lucy`
        }
    ]
};

function showHelp(message) {
    message.author.send({
        embeds: [helpEmbed],
        image: {
            url: emotes.find(emote => emote.name === 'heart-hands').url
        }
    });
}

module.exports = {
    showHelp
};