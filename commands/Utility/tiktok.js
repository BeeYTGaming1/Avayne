const config = require("../../config.json")
const { MessageEmbed } = require('discord.js');
const TikTokScraper = require('tiktok-scraper');
const numformat = n => {
  if (n < 1e3) return n;
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };
const { oneLine } = require('common-tags');
const discord = require('discord.js');

module.exports = {

        name: 'tiktok',
        description: `Shows you the tiktok stats of a provided user!`,
        category: 'Utility',
    async run(client, message, args) {
      if(!args[0]) return message.channel.send(`Please provide me with a user profile!`)
       try 
  {
      const user = await TikTokScraper.getUserProfileInfo(args[0]);
      if(user.user.signature == ''){
          const userbe = new discord.MessageEmbed()
          .setColor(config.color)
          .setTitle(`User Info - @${user.user.uniqueId}`)
          .setURL(`https://www.tiktok.com/@${user.user.uniqueId}`)
          .setThumbnail(user.user.avatarThumb)
          .addField(`Username`, `${user.user.uniqueId}`, true)
          .addField(`Nickname`, `${user.user.nickname}`, true)
          .addField(`Bio`, `No bio yet.`)
          .addField(`Followers`, numformat(`${user.stats.followerCount}`),true)
          .addField(`Following`, numformat(`${user.stats.followingCount}`),true)
          .addField(`Hearts`, numformat(`${user.stats.heartCount}`),true)
          .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send({embed: userbe })
      }
      else
      {
          const userbd = new discord.MessageEmbed()
          .setColor(config.color)
          .setTitle(`User Info - @${user.user.uniqueId}`)
          .setURL(`https://www.tiktok.com/@${user.user.uniqueId}`)
          .setThumbnail(user.user.avatarThumb)
          .addField(`Username`, `${user.user.uniqueId}`, true)
          .addField(`Nickname`, `${user.user.nickname}`, true)
          .addField(`Bio`, `${user.user.signature}`)
          .addField(`Followers`, numformat(`${user.stats.followerCount}`),true)
          .addField(`Following`, numformat(`${user.stats.followingCount}`),true)
          .addField(`Hearts`, numformat(`${user.stats.heartCount}`),true)
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send({embed: userbd })            
      }
  } 
  catch (error) {
    console.log(error)
 message.channel.send(new MessageEmbed()
      .setColor(config.color)
      .setDescription(`Could not find username: **${args[0]}**`)
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true })));
 
}
   
    }
};