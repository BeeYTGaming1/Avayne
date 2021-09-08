const client = require('../index');
const { Collection } = require('discord.js');
const blacklist = require('../models/blacklist');
const mongoose = require('mongoose');
const db = require('../reconDB');
const db2 = require('quick.db')
const ms = require("ms")
const afk = require("../models/afk");
const config = require('../config.json')
const discord = require('discord.js')
const moment = require('moment');


const Timeout = new Collection()

client.on('message', async message =>{
    moment.suppressDeprecationWarnings = true;
    if(message.mentions.members.first()){
      const afklist = await afk.findOne({ userID: message.mentions.members.first().id, serverID: message.guild.id});
      if(afklist){
        
         await message.guild.members.fetch(afklist.userID).then(member => {
         let user_tag = member.user.tag;
         return message.channel.send(`**${afklist.oldNickname || user_tag || member.user.username}** is currently AFK: ${afklist.reason} **- ${moment(afklist.time).fromNow()}**`).catch(() => {});
         });
      }
      }
      
      
      const afklis = await afk.findOne({ userID: message.author.id, serverID: message.guild.id});
      
      
      if(afklis) {
        let nickname =  `${afklis.oldNickname}`;
        message.member.setNickname(nickname).catch(() => {});
        await afk.deleteOne({ userID: message.author.id });
        return   message.channel.send(new discord.MessageEmbed().setColor(config.color).setDescription(`It seems like you've come back! I have removed your afk\n\n\*\*AFK reason: ${afklis.reason}\*\*`)).then(m => {
              setTimeout(() => {
                  m.delete().catch(() => {});
              }, 10000);
            });
      
      };
      



    const p = await client.prefix(message)
    if(message.mentions.users.first()) {
        if(message.content === '<@!853225627926003732>') return message.channel.send(`The prefix in ${message.guild.name} is \`${p}\``)
    }
    if(message.author.bot) return;
    if(!message.content.startsWith(p)) return;
    if (!message.content.startsWith(p)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if (!message.guild) return;
            if (!message.member) message.member = await message.guild.fetchMember(message);
            const args = message.content.slice(p.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            if (cmd.length == 0) return;
            let command = client.commands.get(cmd)
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command) command.run(client, message, args)
        } else {
            message.channel.send('You are blacklisted! Try contacting the developer in support server you will find the link of server here - https://aneo.ml')
        }
    })
  })
  