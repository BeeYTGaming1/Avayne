const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageButton } = require("discord-buttons");
const { color } = require("../../config.json")

module.exports = {
  name: 'invite',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const inviteemebd = new MessageEmbed()
    .setTitle(`Invite ${client.user.username} now!`)
    .setDescription("Want to invite me to your server? Click this button below!" + "\n" + "Have Fun!\n[Click Here](https://dsc.gg/avena)")
    .setColor(color)

    const invite = new MessageButton()
        .setStyle(`url`)
        .setLabel(`Invite`)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    message.channel.send({ button: invite, embed: inviteemebd })
  }
}