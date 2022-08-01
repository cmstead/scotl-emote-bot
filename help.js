function showHelp(message) {
    message.reply(`
**Commands:**

\`help\`
\`list\`
\`next\`
\`weather\`

**Treehouse Weather (weather):**

Reports current weather at the Treehouse in the Hidden Forest.

\`scotl weather\`

**Next Event (next):**

You can ask about the next Grandma, Geyser, or Daily Reset event in the following ways.

\`scotl next grandma\`
\`scotl next gma\`
\`scotl next geyser\`
\`scotl next reset\`
\`scotl next shard\`
\`scotl next weekly\`

**Show Emote:**

\`scotl <emote-name>\`

Examples:

\`scotl cry\`
\`scotl confetti\`
\`scotl bow\`
`);
}

module.exports = {
    showHelp
};