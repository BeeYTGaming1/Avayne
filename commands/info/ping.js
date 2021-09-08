const { Client, Message, MessageEmbed } = require('discord.js');
const pm = require("pretty-ms")
module.exports = {
    name: 'ping',
    aliases: ['p'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
      const shardPing = pm(message.guild.shard.ping)
      message.lineReply("Please wait pinging the servers...").then(resultMessage => {
        const messagePing = resultMessage.createdTimestamp - message.createdTimestamp

        const eesfdsf = new MessageEmbed()
        .setTitle(`🏓 Pong!`)
        .addFields({
          name: " <a:success:853553304663228438> Message Latency",
          value: `${messagePing} ms`
        }, {
          name: " <a:loading:853295894481076255> API Ping",
          value: `${client.ws.ping} ms`
        }, {
          name: "<:happyrobot:853553743676571659> Shard | #0 Ping",
          value: `${shardPing}`
        })
        .setColor('RANDOM')

        resultMessage.edit({ embed: eesfdsf })

        
      })
    }
}