const request = require("node-superfetch");
const config = require("../../config.json")
const Discord = require('discord.js')

module.exports = {
    name: "google",
    aliases: ["gg"],
    description: "Search anything on google",
    run: async (client, message, args) => {



    let googleKey = "AIzaSyA1cM1C3kFwR8uyTOSSDh7dThNzOIWEINc";
    let csx = "49223130713e974a2";
    let result;
    let query = args.join(" ");
    if (!query) query = await client.functions.awaitReply(message, `What do you want to search for?`);
    if (!query) return;

    href = await search(query);
    if(!href) return message.inlineReply(await client.functions.translate(message, "No search results found, maybe try searching for something that exists."), { allowedMentions: { repliedUser: false } });
        const embed = new Discord.MessageEmbed(message)
        .setTitle(href.title)
        .setDescription(href.snippet)
        .setColor(config.color)
        .setImage(href.pagemap.cse_thumbnail ? href.pagemap.cse_thumbnail[0].src : null)
        .setURL(href.link);

        message.channel.send({ embed: embed, allowedMentions: { repliedUser: false } });

    async function search(query){
        const { body } = await request.get("https://www.googleapis.com/customsearch/v1").query({
            key: googleKey, cx: csx, safe:"off", q: query
        });

        if(!body.items) return null;
        return body.items[0];
    }
}
};
