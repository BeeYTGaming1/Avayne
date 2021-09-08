const Discord = require("discord.js");
const backup = require("discord-backup");
const client = new Discord.Client();
const config = require("../../config.json")

module.exports = {
  name: "backup-create",
  usage: "backup-create",
  description: "create backup",
  category: "backup",
  aliases: ["create-backup"],

  run: async (client, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) {
  return message.channel.send(":x: | You must be an administrator of this server to request a backup! Let my role be at the highest for the command to run properly");
}
if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(":x: | I must be an administrator of this server to create a backup! Let my role be at the highest for the command to run properly");
    }
// Create the backup
backup.create(message.guild, {
  jsonBeautify: true
}).then((backupData) => {
  // And send informations to the backup owner
  message.author.send("The backup has been created! To load it, type this command on the server of your choice: `" + config.prefix + "backup-load " + backupData.id + ". Let my role be at the highest for the command to run properly");
  message.channel.send(":white_check_mark: Backup successfully created. Back up id sended in your DMs! Let my role be at the highest for the command to run properly");
});
  }
}