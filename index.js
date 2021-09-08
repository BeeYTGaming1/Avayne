const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const afk = new Collection();
const mongo = require("./mongo.js")
const Sequelize = require('sequelize');
const { getUpdatesWebhook } = require('./helpers/database/db_helper');
const { templateEmbed } = require('./helpers/webhooks/wb_helper');
const bodyParser = require('body-parser');
const db2 = require("quick.db")
const alt = require("discord-anti-alt")
const fetch = require("node-fetch")
const colors = require("colors");
module.exports = afk;
const client = new Client({
    disableEveryone: true,
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
})
require("dotenv").config()
require('discord-reply')
require('discord-buttons')
require("./logger")(client);
const Enmap = require("enmap");

client.settings = new Enmap({
    name: "settings",
    dataDir: "./data/1"
  });
  client.settings2 = new Enmap({
    name: "settings",
    dataDir: "./data/2"
  });
  client.settings3 = new Enmap({
    name: "settings",
    dataDir: "./data/3"
  });
  client.jointocreatemap = new Enmap({
    name: "settings",
    dataDir: "./data/jointocreatemap"
  });
require(`./jointocreate`)(client);
module.exports = client;
const mongoose = require('mongoose');
const color = require("./config.json")
const { MessageButton, MessageActionRow } = require('discord-buttons')

mongoose.connect(process.env.MONGO_BOT, {
    useUnifiedTopology : true,
    useNewUrlParser: true,
}).then(console.log('Connected to mongo db'))

const blacklist = require('./models/blacklist')
const prefixSchema = require('./models/prefix')
const { GiveawaysManager } = require("discord-giveaways")
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./data/give.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#ADD8E6",
        reaction: "🎉"
    }
});
const config = require('./config.json')
const prefix = config.prefix
const reconDB = require('./reconDB');
const db = require('./reconDB');
client.commands = new Collection();
client.aliases = new Collection();
client.config = config;


client.on('clickButton', button => {
    Nuggies.giveaways.buttonclick(client, button);
});

const blacklistedWords = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);


    /**
     * @param {Client} client
     */
     client.prefix = async function(message) {
        let custom;

        const data = await prefixSchema.findOne({ Guild : message.guild.id })
            .catch(err => console.log(err))
        
        if(data) {
            custom = data.Prefix;
        } else {
            custom = prefix;
        }
        return custom;
    }
    



}); 

client.esnipes = new Collection();
client.snipes = new Map()
client.on('messageDelete', function(message, channel){

  client.snipes.set(message.channel.id, {
    content: message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL: null
  })
})


module.exports = client;


client.on('guildDelete', async (guild) => {
    prefixSchema.findOneAndDelete({ Guild : guild.id }).then(console.log('okokokokokoko, setting up prefix ... done!'))
})



const distube = require('distube');
const player = new distube(client, { leaveOnFinish: false });

player.on("playSong", (message, queue, song) => {
  message.channel.send(`Now playing! ${song.name}`)
}).on("addList", (message, queue, playlist) => {
    message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to queue, requested by ${song.user}`
    );
})
.on("empty", (message) => {
    message.channel.send("Channel is empty. Leaving the channel")
})
.on("error", (message, err) => {
    message.channel.send(`An Error occoured: ` + err)
})
.on("finish", (message) => message.channel.send("There are no more songs in the queue"))
.on("noRelated", message => message.channel.send("Can't find related video to play."))
.on("searchCancel", (message) => message.channel.send(`Searching canceled`))

client.player = player;


client.on('guildMemberAdd', async member => {
    const altdays = db2.get(`altdays.${member.guild.id}`)
    const altchannel = db2.get(`antialt.${member.guild.id}`)
    if(!altdays || !altchannel)return;



    const account = new alt.config({
        days:parseInt(altdays),
        options:'kick'
    })

    let running = account.run(member);
    let profile = alt.profile(member);
    if(running) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag,member.user.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField("Account's Age: ",profile.userAge,true)
        .addField("Minimum Age required: ",altdays,true)
        .addField("Account was created at: ",profile.date.userDateCreated,true)
        return member.guild.channels.cache.get(altchannel).send(embed)
    }
})

client.login(process.env.TOKEN)
