function showHelp(message) {
    message.reply(`
Commands:

help
list
next

Next Event (next):

You can ask about the next Grandma, Geyser, or Daily Reset event in the following ways.

scotl next grandma
scotl next gma
scotl next geyser
scotl next reset

Show Emote:

scotl <emote-name>

Like this:

scotl cry
scotl confetti
scotl bow
`);
}

module.exports = {
    showHelp
};