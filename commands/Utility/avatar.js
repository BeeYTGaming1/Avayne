const { Client, Message, MessageEmbed } = require("discord.js");
const { color} = require("../../config.json");

module.exports = {
  name: 'avatar',
  aliases: ["av", "pfp"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;

    message.channel.send(
        new MessageEmbed()
        .setTitle(`${member.user.tag}'s Avatar`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setColor(color)
    )
  }
}