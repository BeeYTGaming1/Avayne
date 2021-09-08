const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'donate',
    description: "Help me if u can ;\)",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
            new MessageEmbed()
            .setTitle("Donate!")
            .setDescription("Paypal: Comin Soon\nPatreon: Coming soon!")
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter("Thank you for donating and using the bot.")
        )
    }
}