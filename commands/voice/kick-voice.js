const discord = require('discord.js');
const config = require('../../config.json');
const {
  databasing,
  escapeRegex
} = require("../../functions")
//import the Discord Library
const Discord = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");

module.exports = {
name: 'kickvc',
aliases: ['kick-voice', "kickvoice"],
usage: 'kickvc <user>',
description: 'Kick a user out of your channel!',
run: async (client, message, args) => {

    let {
        channel
      } = message.member.voice;
      if (!channel) return message.reply(new Discord.MessageEmbed()
        .setColor(config.wrongcolor)
        .setTitle(":x: You have to be in a VoiceChannel, for this Command")
        .setFooter(config.footertext)
      )
      client.jointocreatemap.ensure(`tempvoicechannel_${message.guild.id}_${channel.id}`, false)
      client.jointocreatemap.ensure(`owner_${message.guild.id}_${channel.id}`, false);
      if (client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`)) {
        var vc = message.guild.channels.cache.get(client.jointocreatemap.get(`tempvoicechannel_${message.guild.id}_${channel.id}`));
        let perms = vc.permissionOverwrites.map(c => c)
        let owner = false;
        for (let i = 0; i < perms.length; i++) {
          if (perms[i].id === message.author.id && perms[i].allow.toArray().includes("MANAGE_CHANNELS")) owner = true;
        }
        if (client.jointocreatemap.get(`owner_${message.guild.id}_${channel.id}`) === message.author.id) owner = true;
        if (!owner)
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.wrongcolor)
            .setTitle(":x: You have to be the Owner of the **temp.** VoiceChannel!")
            .setFooter(config.footertext)
          )
        if (!args[0]) return message.reply(new Discord.MessageEmbed()
          .setColor(config.wrongcolor)
          .setTitle(":x: Please add a User via Ping / ID!")
          .setDescription(`Useage: \`${prefix}kickvc @User\``)
          .setFooter(config.footertext)
        )
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
          .setColor(config.wrongcolor)
          .setTitle(":x: Please add a User via Ping / ID!")
          .setDescription(`Useage: \`${prefix}kickvc @User\``)
          .setFooter(config.footertext)
        )
        if (!member.voice.channel)
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.wrongcolor)
            .setTitle(":x: Your pinged user, is not connected to a Channel")
            .setFooter(config.footertext)
          )
        if (member.voice.channel.id != channel.id)
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.wrongcolor)
            .setTitle(":x: Your pinged user, is not connected in your Channel")
            .setFooter(config.footertext)
          )
        try {
          member.voice.kick();
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.color)
            .setTitle(`✅ Kicked ${member.user.tag} out of your Channel`)
            .setFooter(config.footertext)
          )
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setColor(config.wrongcolor)
            .setTitle(":x: An Error occurred")
            .setDescription(`\`\`\`${e.message}\`\`\``)
            .setFooter(config.footertext)
          )
        }
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setColor(config.wrongcolor)
          .setTitle(":x: You have to be in a **temp.** VoiceChannel, for this Command!")
          .setFooter(config.footertext)
        )
      }

},
};