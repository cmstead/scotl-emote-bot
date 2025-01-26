module.exports = function (client) {
    function move(message) {
        const guild = client.guilds.cache.get(message.guild.id);

        const destinationChannel = guild.channels.cache.find(channel => channel.name.endsWith('tips-board'));

        const tipContent = `by: ${message.author.username}\n${message.content}`;

        destinationChannel.send({
            content: tipContent,
            files: message.attachments.map(attachment => attachment.url),
            embeds: message.embeds
        });

        message.delete();
    }

    return {
        move
    };
}