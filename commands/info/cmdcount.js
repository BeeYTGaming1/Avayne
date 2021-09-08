const {
    MessageEmbed
  } = require("discord.js");
  module.exports = {
    name: "command-count", 
    category: "Information", 
    aliases: ["cmdcount", "commandamount", "cmdamount"], 
    usage: "commandcount", 
    description: "Shows the Amount of Commands an Categories", //the  //Message if the user has too many / not enough args / too many plus args, which will be sent, leave emtpy / dont add, if you wanna use command.usage or the default message! [OPTIONAL]
    run: async (client, message, args) => {
      try {
        message.channel.send(new MessageEmbed()
          .setColor("RANDOM")
          .setFooter("If bot doesnt shows, please try again! ")
          .setTitle("Command Counter")
          .setDescription(`:gear: **${client.categories.length} Categories**`)
          .addField(`:gear: Commands`, `**${client.commands.size} Commands**`)
        );
      } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
          .setColor("red").setFooter("Check again..")
          .setTitle(`:no: An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        );
      }
    }
  }