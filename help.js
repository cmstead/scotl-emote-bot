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

**Examples**

\`scotl cry\`
\`scotl confetti\`
\`scotl giveup\``
        },
        {
            name: 'Next Event',
            value: `
\`scotl next <event-name>\`

You can ask about the next upcoming daily events like the following.

\`scotl next grandma|gma|granny\`
\`scotl next geyser\`
\`scotl next reset\`
\`scotl next sunset\`
\`scotl next weekly\``
        }
    ]
};

function showHelp(message) {
    message.author.send({
        embeds: [helpEmbed]
    });
}

module.exports = {
    showHelp
};