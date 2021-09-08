const client = require('../index.js')
const { Database } = require('quickmongo')
const db = new Database(process.env.MONGO_BOT);
const fetch = require("node-fetch");


client.on("message", async (message) => {
	const channel = await db.get(`chatbot_${message.guild.id}`);
	if(!channel) return;
	const sChannel = message.guild.channels.cache.get(channel);
	if (!sChannel) return;
	if (message.author.bot || sChannel.id !== message.channel.id) return;
	message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
	if (message.content.includes(`@`)) {
		return sChannel.send(`**:x: Please dont mention anyone**`);
	}
	sChannel.startTyping();
	if (!message.content) return sChannel.send("Please say something.");
	fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=${client.user.username}&user=${message.author.username}&gender=Male`)
	.then(res => res.json())
	.then(data => {
		sChannel.send(`> ${message.content} \n ${data.message}`);
	});
	sChannel.stopTyping();				
});
