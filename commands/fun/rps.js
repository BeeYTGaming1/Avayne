const { Client, Message, MessageEmbed } = require('discord.js');
const Discord = require("discord.js")
module.exports = {
    name: 'rockpaperscissors',
	description: "Play rock-paper-scissors",
	usage: "<prefix>rps",
    aliases: ['rps'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const acceptedReplies = ['rock', 'paper', 'scissors'];
	const random = Math.floor((Math.random() * acceptedReplies.length));
	const result = acceptedReplies[random];
	const embed = new Discord.MessageEmbed()
		.setTitle('Rock Paper Scissors Against Aneo')
		.setDescription('React with 🗿 for stone\nReact with 📄 for paper\nReact with ✂️ for scissor')
	message.channel.send(embed).then(m =>{
		m.react('🗿');
		m.react('📄');
		m.react('✂️');
		const filter = (reaction, user) => {
			return ['🗿', '📄', '✂️'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		m.awaitReactions(filter, { max: 1, time: 100000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '🗿') {
					if (result === 'paper') return message.reply('I won! I choose ' + result);
					else return message.reply('You won! I choose ' + result);
				}
				if(reaction.emoji.name === '📄') {
					if (result === 'scissors') return message.reply('I won! I choose ' + result);
					else return message.reply('You won! I choose ' + result);
				}
				else if (result === 'rock') {return message.reply('I won! I choose ' + result);}
				else {return message.reply('You won! I choose ' + result);}
			},
			)
			.catch(collected => {
				message.reply('You were too late!');
			});
	});
    }
}