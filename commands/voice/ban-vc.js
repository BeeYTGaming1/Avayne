
const config = require('../../config.json');
const ee = require("../../config.json")
const {
    databasing,
    escapeRegex
  } = require("../../functions")
  //import the Discord Library
  const Discord = require("discord.js");
  let cpuStat = require("cpu-stat");
  let os = require("os");

module.exports = {
name: 'banvc',
aliases: ['ban-voicechat'],
usage: 'banvc <user>',
description: 'Ban a user in your voicechannel',
run: async (client, message, args) => {

    let {
        channel
      } = message.member.voice;
      if (!channel) return message.reply(new Discord.MessageEmbed()
        .setColor(ee.wrongcolor)
        .setTitle(":x: You have to be in a VoiceChannel, for this Command")
        .setFooter(ee.footertext, ee.footericon)
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
            .setColor(ee.wrongcolor)
            .setTitle(":x: You have to be the Owner of the **temp.** VoiceChannel!")
            .setFooter(ee.footertext, ee.footericon)
          )
        if (!args[0]) return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: Please add a User via Ping / ID!")
          .setDescription(`Useage: \`${prefix}banvc @User\``)
          .setFooter(ee.footertext, ee.footericon)
        )
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: Please add a User via Ping / ID!")
          .setDescription(`Useage: \`${prefix}banvc @User\``)
          .setFooter(ee.footertext, ee.footericon)
        )
        if (member.voice.channel && member.voice.channel.id == channel.id)
          try {
            member.voice.kick();
            message.reply(new Discord.MessageEmbed()
              .setColor(ee.color)
              .setTitle(`✅ Disconnected ${member.user.tag} out of your Channel`)
              .setFooter(ee.footertext, ee.footericon)
            )
          } catch (e) {
            message.reply(new Discord.MessageEmbed()
              .setColor(ee.wrongcolor)
              .setTitle(":x: An Error occurred")
              .setDescription(`\`\`\`${e.message}\`\`\``)
              .setFooter(ee.footertext, ee.footericon)
            )
          }
        vc.updateOverwrite(member.user.id, {
          VIEW_CHANNEL: true,
          CONNECT: false
        }).then(lol => {
          vc.updateOverwrite(message.author.id, {
            MANAGE_CHANNELS: true,
            VIEW_CHANNEL: true,
            MANAGE_ROLES: true,
            CONNECT: true
          })
          message.reply(new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle(`✅ Banned ${member.user.tag} out from your Channel!`)
            .setFooter(ee.footertext, ee.footericon)
          )
        })
  
  
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: You have to be in a **temp.** VoiceChannel, for this Command!")
          .setFooter(ee.footertext, ee.footericon)
        )
      }

},
};