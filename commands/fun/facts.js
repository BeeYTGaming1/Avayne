
const fetch = require('node-fetch');
const Guild = require('../../models/Guild');
const discord = require('discord.js');
const request = require('request-promise-native');
const config = require("../../config.json")

module.exports = {
        name: 'facts',
        aliases:['fact'],
        description: 'make a fact',
        usage: 'fact/facts <text>',

    async run(client, message, args) {
      const guildDB = await Guild.findOne({
        id: message.guild.id
      });
    

      try {
        let text = args.slice(0).join(" ")
        if(!text) return message.channel.send(new discord.MessageEmbed().setColor(config.color).setDescription(`:x: Try again later..`));
        
          if(text.length > 60) return message.channel.send(new discord.MessageEmbed().setColor(config.color).setDescription(`:x: Try again later..`));
        let options = {
          url: 'https://api.alexflipnote.dev/facts',
          headers: {
            'Authorization': config.alexflipnote
          },
          qs: {
            text: args.join(' ').split('').join('')
          },
          encoding: null
        };
      
        let response = await request(options);
      
        await message.channel.send({
          files: [ response ]
        });
      } catch(error) {
        this.client.emit("apiError", error, message);
      }
    }
};