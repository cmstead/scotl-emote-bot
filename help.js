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

scotl <emote search term>

Example: To show the Tearful Light Miner emote you can search in any of these ways:

scotl cry
scotl crying
scotl light miner
scotl tearful light miner
`);
}

module.exports = {
    showHelp
};