const { Client, Message, MessageEmbed, Util } = require("discord.js");
const config = require("../../config.json")
module.exports = {
  name: 'steal',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_EMOJIS")) return message.reply("You do not have permission.")

    const emoji = args[0];
       if (!emoji) return message.channel.send("Please provide emoji to add\n\n**Usage:** `addemoji <emoji> <name>`");

      let custom = Util.parseEmoji(emoji);

		const name = args[1] ? args[1].replace(/[^a-z0-9]/gi, "") : null;
		if (!name) {
			return message.lineReply("Please provide a name to set");
		}
		if (name.length < 2 || name > 32) {
			return message.lineReply("Emoji name length should be between 2 and 32");
		}     
   const URL = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`;
   
     message.guild.emojis
			.create(URL, name)
			.then(emoji => {
				message.lineReply(`Emoji ${emoji} was successfully added`, {
					emojiName: emoji.name
				}).catch((err) =>{
				    const em = new MessageEmbed()
				    message.lineReply("Error exist")
				    console.log(err)
				});
			})
  },
};