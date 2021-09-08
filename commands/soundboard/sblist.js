  
const Discord = require('discord.js')
const { prefix } = require("../../config.json");


module.exports = {
    name: "sb-list",
    aliases: ["sblist", "sb-list", "sbl"],
    description: "Soundboard list command",

    run: async (client, message, args) => {

        const help = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Prefix: \`${prefix}\``)
        .setAuthor('Soundboard list', message.author.displayAvatarURL())

        .addFields({
            name: `Sounboard of ${client.user.username}`,
            value: `How to use: \n \`\`\`<prefix>sb <sound name> \`\`\``,
        },
        {
            name: 'Here are the list of soundboard',
            value: '`ahshit`, `ara`, `bruh`, `oioioi`, `onichan` `uwu`',        
        },)

        message.channel.send(help)
    }
}