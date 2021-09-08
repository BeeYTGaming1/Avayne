const { Client, Message, MessageEmbed, MessageAttachment } = require('discord.js');
const { Canvas } = require("canvacord")
const { prefix } = require("../../config.json")
module.exports = {
    name: 'color',
    aliases: ['co'],
    description: "See your coloe in hex code",
    usage: `${prefix}color color_name_or_hexcode`,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const color = args[0];
        if(!color) return message.reply(`Please enter a color, Example h!color red or ${prefix}color #000000`)

        const img = Canvas.color(color, false, 2048, 2048);
        
        const attachment = new MessageAttachment(img, "color.png");

        message.channel.send(attachment);
    }
}