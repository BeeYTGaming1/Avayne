const { color } = require("../../config.json");
const Discord = require("discord.js");

module.exports = {
  name: "hearts",
  aliases: ["love"],
  category: "Image",
  description: "Shows hearts in img",
  usage: "hearts <user>",
  run: async (client, message, args) => {
    
   const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
   if(!Member) return message.channel.send("Please mention a user")

    const Embed = new Discord.MessageEmbed()
    .setColor(color)
    .setTitle("Hearts")
    .setImage(encodeURI
    (`https://api.devs-hub.xyz/hearts?image=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setTimestamp();

    return message.channel.send({ embed: Embed});
  }
};