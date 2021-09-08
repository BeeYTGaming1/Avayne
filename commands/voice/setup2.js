const Discord = require('discord.js');
const config = require("../../config.json")
const {
  databasing,
  escapeRegex
} = require("../../functions")
//import the Discord Library
let cpuStat = require("cpu-stat");
let os = require("os");

module.exports = {
name: 'setup2',
aliases: [''],
usage: 'setup2',
description: 'Creates a (2nd) temp. Voice Channel Setup',
run: async (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new Discord.MessageEmbed().setColor(config.color).setFooter(config.footertext).setTitle(":x: You don't have enough Permissions!"));
        let {
          channel
        } = message.member.voice;
        if (channel) {
          message.reply(new Discord.MessageEmbed()
            .setTitle("<:ChannelMaster:778404076466602024> Setup 2 Complete for Join to Create")
            .setColor(config.color)
            .setDescription(`Bound to Channel: \`${channel.name}\`\nPlease rejoin!`)
            .setFooter(config.footertext)
          );
          client.settings2.set(message.guild.id, channel.id, `channel`);
        } else {
          message.guild.channels.create("Join to Create", {
            type: 'voice',
            bitrate: 8000,
            userLimit: 2,
            permissionOverwrites: [ //update the permissions
              { //the role "EVERYONE" is just able to VIEW_CHANNEL and CONNECT
                id: message.guild.id,
                allow: ['VIEW_CHANNEL', "CONNECT"],
                deny: ["SPEAK"]
              },
            ],
          }).then(vc => {
            if (message.channel.parent) vc.setParent(message.channel.parent.id)
            message.reply(new Discord.MessageEmbed()
              .setTitle("<:ChannelMaster:778404076466602024> Setup 2 Complete for Join to Create")
              .setColor(config.color)
              .setDescription(`Bound to Channel: \`${vc.name}\`\n\nI created the Channel for you!`)
              .setFooter(config.footertext)
            );
            client.settings2.set(message.guild.id, vc.id, `channel`);
          })
        }

        return;

},
};