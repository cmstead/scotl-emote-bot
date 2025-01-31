const info = {
    'clock': {
        name: 'Sky Clock',
        url: 'https://sky-clock.netlify.app'
    },
    'friend-tree': {
        name: 'Friendship Tree',
        imageUrl: 'https://static.wikia.nocookie.net/sky-children-of-the-light/images/9/97/Friendship-Tree-by-Clement.png/revision/latest/scale-to-width-down/1000?cb=20240915175621',
        url: ''
    },
    'planner': {
        name: 'Sky Planner',
        url: 'https://sky-planner.com/'
    },
    'shards': {
        name: 'Shard Events',
        url: 'https://sky-shards.pages.dev/'
    },
    'wiki': {
        name: 'Sky Wiki',
        url: 'https://sky-children-of-the-light.fandom.com/wiki/Sky:_Children_of_the_Light_Wiki'
    }
};

function sendInfo(message, tokens, client) {
    const command = tokens[0]?.toLowerCase();
    const infoKey = tokens.slice(1).join(' ');

    const infoData = info[infoKey];

    if (!infoData) { throw new Error(`No info found for ${infoKey}`); };

    const resendMessage = `To show this message again, type \`scotl ${command} ${infoKey}\``;

    const embed = {
        title: `Info: ${infoData.name}`,
        description: `${infoData.url}\n\n-# ${resendMessage}`
    };

    if(infoData.imageUrl) {
        embed.image = {
            url: infoData.imageUrl
        };
    }

    if(command === 'info') {
        message.author.send({
            embeds: [embed]
        });
    } else if (command === 'share-info') {
        const guild = client.guilds.cache.get(message.guild.id);
        const channel = guild.channels.cache.get(message.channelId);

        channel.send({
            embeds: [embed]
        });
    }
}

module.exports = {
    sendInfo
}