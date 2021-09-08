const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'votes',
    description: "Vote for me on Top.gg, etc....",
    aliases: ["v", "vo"],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send(
          new MessageEmbed()
          .setTitle('Vote for Me')
          .addField(`Disbots List`, `[Click Here](https://disbotlist.xyz/bot/853225627926003732/vote)`)
          .addField(`Void Bots`, `[Click Here](https://voidbots.net/bot/853225627926003732/vote)`)
          .addField(`Discord Bot List`, `[Click Here](https://discordbotlist.com/bots/avena/upvote)`)
          .addField(`Top.gg`, `Coming Soon`)
          .addField(`Support Server`, `[Click Here](https://discord.gg/cFk7VsfkZS)`)
          .setFooter("Thanks for using my bot")
          .setColor('RANDOM')
        )
    },
};