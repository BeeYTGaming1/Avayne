const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');

module.exports = {
    name:"uptime",
    description: "Show uptime of bot",
    aliases: ["up"],
    hide: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let upembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle(`My Uptime <a:loading:853627433931243520>`)
        .addField(`Days`, `${days}`)
        .addField(`Hours`, `${hours}`)
        .addField(`Minutes`, `${minutes}`)
        .addField(`Seconds`, `${seconds}`)
        message.channel.send(upembed)
    }
}