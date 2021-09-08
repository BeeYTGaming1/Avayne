const discord = require('discord.js');
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
name: 'invitevc',
aliases: ['invite-vc', "invite-voicechat"],
usage: 'invotevc',
description: 'Invites a user for your voice channel',
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
          .setDescription(`Useage: \`${prefix}invitevc @User [optional Message]\``)
          .setFooter(ee.footertext, ee.footericon)
        )
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member || member == null || member == undefined) return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: Please add a User via Ping / ID!")
          .setDescription(`Useage: \`${prefix}invitevc @User [optional Message]\``)
          .setFooter(ee.footertext, ee.footericon)
        )
        let txt = args.slice(1).join(" ");
        try {
          channel.createInvite().then(invite => {
            vc.updateOverwrite(member.user.id, {
              VIEW_CHANNEL: true,
              CONNECT: true
            }).then(lol => {
              vc.updateOverwrite(message.author.id, {
                MANAGE_CHANNELS: true,
                VIEW_CHANNEL: true,
                MANAGE_ROLES: true,
                CONNECT: true
              })
              member.user.send(new Discord.MessageEmbed()
                .setColor(ee.color)
                .setTitle(`You got invited to join ${message.author.tag}'s Voice Channel`)
                .setDescription(`[Click here](${invite.url}) to join **${channel.name}**\n\n${txt ? txt : ""}`.substr(0, 2000))
                .setFooter(ee.footertext, ee.footericon)
              ).catch(e => {
                return message.reply(new Discord.MessageEmbed()
                  .setColor(ee.wrongcolor)
                  .setTitle(`:x: Error | Couldn't Dm \`${member.user.tag}\``)
                  .setDescription(`\`\`\`${e.message}\`\`\``)
                  .setFooter(ee.footertext, ee.footericon)
                )
              })
            })
            return message.reply(new Discord.MessageEmbed()
              .setColor(ee.color)
              .setTitle(`✅ Invited ${member.user.tag} to your Channel`)
              .setFooter(ee.footertext, ee.footericon)
            )
          })
  
        } catch (e) {
          return message.reply(new Discord.MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(":x: An Error occurred")
            .setDescription(`\`\`\`${e.message}\`\`\``)
            .setFooter(ee.footertext, ee.footericon)
          )
        }
      } else {
        return message.reply(new Discord.MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(":x: You have to be in a **temp.** VoiceChannel, for this Command!")
          .setFooter(ee.footertext, ee.footericon)
        )
      }

},
};