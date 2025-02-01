module.exports = function (client, destination = 'tips-board') {
    function move(message) {
        const guild = client.guilds.cache.get(message.guild.id);

        const destinationChannel = guild.channels.cache.find(channel => channel.name.endsWith(destination));

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