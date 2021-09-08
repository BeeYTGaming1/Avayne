//https://tenor.com/view/anime-hug-manga-cuddle-japan-gif-10522729
const discord = require('discord.js')

module.exports = {
    name: "hug",
    description: "hugs a user UwU",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const user = message.author;

        const user2 = message.mentions.members.first()

        if(!user2) return message.channel.send('Whom do you want to hug Uwu <:TCC_pink_heart:854713660991602708>')

        message.channel.send(
            new discord.MessageEmbed()
            .setDescription(`${user} Hugs ${user2} Aww So cute <:TCC_pink_heart:854713660991602708>`)
            .setImage(`https://i.pinimg.com/originals/10/8c/22/108c2257683620292f4687262f26e872.gif`)
            .setColor('BLUE')
        )
    }
}