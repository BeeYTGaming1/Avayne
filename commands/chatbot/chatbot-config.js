const Discord = require('discord.js');
const config = require('../../config.json');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_BOT)


module.exports = {
        name: 'chatbot-config',
        description: 'Shows ChatBot\'s config',
        usage: '',
    run: async (client, message, args) => {
      const embedd = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `🤖 ChatBot Configuration 
        ** Usage :**
         Type \`${config.prefix}set-chatbot\` - To Set a Channel 
         Type \`${config.prefix}disable-chatbot\` - To Disable a Channel.
         ChatBot Channel Set - None
        ** Examples :**
         \`${config.prefix}set-chatbot\` <#${message.channel.id}>
         \`${config.prefix}disable-chatbot\` <#${message.channel.id}>`
      )
     .addField(
        "Support Link: ",
        `**[Click Here!](https://discord.gg/cFk7VsfkZS)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://voidbots.net/bot/853225627926003732/vote)**`,
        true
      )
      .setTimestamp()
      .setColor(config.color);
    
     let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
    if(!channel1) return message.channel.send(embedd)
    var sChannel = message.guild.channels.cache.get(channel1);
    let embedvch = "<#" + sChannel.id + ">"
    
    const embed = new Discord.MessageEmbed()
    
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `**🤖 ChatBot Configuration** 
        **${client.emotes.info} Usage :**
         Type \`${config.prefix}setchatbotchannel\` - To Set a Channel 
         Type \`${config.prefix}disablechatbotchannel\` - To Disable a Channel.
         ChatBot Channel Set - ${embedvch} 
        **${client.emotes.info} Examples :**
         \`${config.prefix}setchatbotchannel\` <#${message.channel.id}>
         \`${config.prefix}disablechatbotchannel\` <#${message.channel.id}>`
                     )
     .addField(
        "Support Link: ",
        `**[Click Here!](https://discord.gg/cFk7VsfkZS)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://voidbots.net/bot/853225627926003732/vote)**`,
        true
      )
      .setTimestamp()
      .setColor(config.color);
    message.channel.send(embed);
  }
}