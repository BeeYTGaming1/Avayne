const client = require('../index')
const { MessageEmbed } = require('discord.js');
client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (
            channel.type === 'text' && 
            !channelToSend && 
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
            ) channelToSend = channel;
    });

    if(!channelToSend) return;

    channelToSend.send(
        new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setDescription(":white_check_mark: Thanks you for inviting me! My prefix is `;` I will be more than happy to help out this server! And don't forget to give me permission! If you need anymore help regarding the bot join the support server! [Here](https://discord.gg/PRdKamPre7)")
        .setTimestamp()
        .setFooter("Thanks for inviting me!")
    )
});