const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config.json")
module.exports = {
    name: 'simp-rate',
    description: "How your simp?",
    aliases: ['simp', 'howsimp'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const simpr8 = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const embed = new MessageEmbed()
        .setTitle(`Simp Rate Machine`)
        .setDescription(`${member.user.username} is ${simpr8}% Simp`)
        .setColor("RANDOM")
        .setURL("https://www.youtube.com/watch?v=Sp9Ih-6qB18")

        message.channel.send(embed)
    }
}