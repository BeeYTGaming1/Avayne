const Discord = require('discord.js');
const config = require('../../config.json');
const ee = require("../../config.json")
const {
    databasing,
    escapeRegex
  } = require("../../functions")
  //import the Discord Library
  let cpuStat = require("cpu-stat");
  let os = require("os");

module.exports = {
name: 'limitvc',
aliases: ['limit-voice'],
usage: 'limit <number>',
description: 'Limit number of people can join your voicechannel',
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
        if (!args[0]) return message.reply(
          new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: You have to include the limit you want to set to")
        );
        if (isNaN(args[0])) return message.reply(
          new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: You have to include the limit you want to set to | It MUST be a **Numer**")
        );
        let userlimit = Number(args[0]);
        if (userlimit > 99 || userlimit < 0) return message.reply(
          new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(":x: Your included Number is not in the valid Range (`0` - `99`)")
        );
        channel.setUserLimit(userlimit).then(vc => {
          return message.reply(new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle(`✅ Set User-limit to \`${vc.userLimit}\``)
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