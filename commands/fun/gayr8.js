const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'gay-rate',
    aliases: ['gay', "howgay"],
    description: "Rating your gay",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const gayr8 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const embed = new MessageEmbed()
        .setTitle(`Gay Rate machine`)
        .setDescription(`${member.user.username} is ${gayr8}% Gay`)
        .setColor("RANDOM")

        message.channel.send(embed)
    }
}