const Discord = require('discord.js');
module.exports = {
  name: "clown",
  usage: "clown <user>",
  description: "Who is clown?",
  run: async (client, message, args) => {
     const user =
      message.mentions.members.first() || message.member;
let msg = await message.channel.send('Loading...')
      let att = new Discord.MessageAttachment(`https://api.popcatdev.repl.co/clown?image=${user.user.displayAvatarURL({ dynamic: false, format: "png"})}`, `${user.user.username}_clown.png`)

      message.channel.send(att)
      msg.delete()
  }
}