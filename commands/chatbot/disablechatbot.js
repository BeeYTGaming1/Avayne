const Discord = require('discord.js');
const config = require('../../config.json');
const { Database } = require("quickmongo")
const db = new Database(process.env.MONGO_BOT)

module.exports = {
        name: 'disable-chatbot',
        description: 'Disables a ChatBot Channel',
        aliases: ["disablechatbotchannel"],
        usage: 'disable-chatbot <channel>',
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
            color: config.color,
            title: `You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
    try {
        let a = db.fetch(`chatbot_${message.guild.id}`)

        if (!a) {
            return message.channel.send({embed: {
            color: config.color,
            title:  ` There is no ChatBot channel set to Disable! `
        }})
        } else {
            let channel = message.guild.channels.cache.get(a)
           // client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.verified} ChatBot Channel Disabled!**`)
            db.delete(`chatbot_${message.guild.id}`)
    
            message.channel.send({embed: {
            color: config.color,
            title: ` ChatBot Channel has been Succesfully Disabled! `
        }})
        }
        return;
    } catch(err) {
        console.log(err)
        return message.channel.send(` Error - Missing Permissions or Channel Doesn't Exist`)
    }

    }
}