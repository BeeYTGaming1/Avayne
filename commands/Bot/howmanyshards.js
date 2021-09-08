const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'shards',
    description: "See how many shards",
    aliases: ["hms", "shard"],
    hide: true,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if(!message.author.id === "800331322089537538") return;
        message.channel.send(`Shard id for ${message.guild.name}, Shard #${message.guild.shardID}`)
    }
}