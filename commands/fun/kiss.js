const { Client, Message, MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")
module.exports = {
  name: "kiss",
  usage: "(User)",
  description: "Kiss someone",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const words = args.slice(1).join(" ");
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) {
      return client.err(message, "Fun", "kiss", 1);
    }
    if (user.id === message.author.id) {
      return client.err(message, "Fun", "kiss", 33);
    }
    const embed = new MessageEmbed();
    embed.setDescription(`${message.author} **kisses** ${user}`);
    if (words) {
      embed.addField("Words: ", words);
    }
    embed.setImage(
      `https://media.discordapp.net/attachments/814310468906123274/817656819416825896/image0.gif`
    );
    embed.setColor(color);
    message.channel.send({ embed: embed }).then(msg => msg.react("💕"));
  },
};