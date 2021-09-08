
const config = require("../../config.json")
const {
  databasing,
  escapeRegex
} = require("../../functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");

module.exports = {
name: 'setupname',
aliases: ['setupname1'],
usage: 'setupname <new-name>',
description: 'Setup create channel name',
run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed().setColor(config.color).setFooter(config.footertext).setTitle(":x: You don't have enough Permissions!"));
        if (!args[0]) return message.reply(new Discord.MessageEmbed().setColor(config.color).setFooter(config.footertext).setTitle(":x: You didn't add a Channelname").setDescription(`Useage: \`${prefix}setupname [new Channel Name]\` | Note: {user} will be replaced with username*`));
        if (args[0].length > 32) return message.reply(new Discord.MessageEmbed().setColor(config.color).setFooter(config.footertext).setTitle(":x: Your provided Channel Name is too Long").setDescription(`The maximum length for a Channel name is \`32\` Letters`));
        client.settings.set(message.guild.id, args.join(" "), "channelname");
        message.reply(new Discord.MessageEmbed()
          .setTitle("<:ChannelMaster:778404076466602024> Successfully changed the Channelname for the temp. Channels")
          .setColor(config.color)
          .setDescription(`New Channel name: \`${client.settings.get(message.guild.id, "channelname")}\`\n\nWhat it could look like: \`${client.settings.get(message.guild.id, "channelname").replace("{user}", message.author.username)}\``)
          .setFooter(config.footertext)
        );
        return;
},
};