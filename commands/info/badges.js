const { Client, Message, MessageEmbed, UserFlags } = require("discord.js");

module.exports = {
  name: 'badges',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();

        message.channel.send(`${user}'s badges <a:All_discord_badges_gif:853643258528792666> : ${flags.join(', ')} `)
  }
}