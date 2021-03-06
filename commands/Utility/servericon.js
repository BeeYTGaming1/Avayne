const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "View the icon of the server",
  category: "Utilities",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const Embed = new MessageEmbed()
      .setTitle(`Icon of ${message.guild.name}`)
      .setURL(client.web)
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`)
      .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }));
    message.channel.send({ embed: Embed});
  },
};