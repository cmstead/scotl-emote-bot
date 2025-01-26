module.exports = function (client) {
    function move(message) {
        const guild = client.guilds.cache.get(message.guild.id);

        const destinationChannel = guild.channels.cache.find(channel => channel.name.endsWith('tips-board'));

        const tipContent = `by: ${message.author.username}\n${message.content}`;
        const tipAttachments = message.attachments.map(attachment => attachment.url);
        const embeds = message.embeds
        
        message.delete();

        destinationChannel.send({
            content: tipContent,
            files: tipAttachments,
            embeds: embeds
        });

    }

    return {
        move
    };
}