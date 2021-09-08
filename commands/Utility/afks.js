const Guild = require('../../models/Guild');
const { MessageEmbed } = require('discord.js');
const afk = require('../../models/afk.js');
const talkedRecently = new Set();
const discord = require("discord.js");

module.exports = {

name: 'afk',
aliases: [],
description: 'Set an AFK message!',
usage: [ '<reason>' ],
run: async (client, message, args) => {
    const guildDB = await Guild.findOne({
        id: message.guild.id
    });

    const oldNickname = message.member.nickname || message.author.username;
    const nickname = `[AFK] ${oldNickname}`;
      const userr = message.mentions.users.first();
      if (userr) return message.channel.send(`Please make sure not to include mentions.`)
      let everyoneping = (args.indexOf("@everyone") > -1);
      if (everyoneping === true) return message.channel.send(`You may not use the everyone ping.`)
      if(args.length > 100){
      message.channel.send(`Thats a quiet big reason`)
          }
      const content = args.join(" ") || 'AFK';

      const afklist = await afk.findOne({ userID: message.author.id});

      await message.member.setNickname(nickname).catch(() => {})
  
          if (!afklist) {
        const newafk = new afk({
         userID: message.author.id,
         serverID: message.guild.id,
          reason: content,
          oldNickname: oldNickname, 
           time: new Date()
        });

        const embed = new discord.MessageEmbed()
          .setDescription(`You have been set to afk\n**Reason : ${content}**`)
          .setColor(message.guild.me.displayHexColor)
          .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
          message.channel.send(embed)
        newafk.save().catch((err) => console.error(err));
    }

}
}