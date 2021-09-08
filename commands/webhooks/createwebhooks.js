const Discord = require('discord.js');
const config = require('../../config.json');
const { addWebhook } = require("../../helpers/database/db_helper");

module.exports = {
name: 'create-webhook',
aliases: ['createwebhook'],
usage: 'createwebhook <#channel> <updates?> <username>',
description: 'Creates webhook with given avatar in provided channel',
run: async (client, message, args) => {

      // extract channel and avatar from inputs
      const target_channel = message.mentions.channels.first();
      // check for updates bool
      let updates = false;
      if (args[0].toLowerCase() === 'true')
          updates = true;
      // username is every arg after the first 2
      const target_username = args.splice(2).join(' ');
      

      // based on: https://discordjs.guide/popular-topics/webhooks.html#creating-webhooks-through-server-settings
      // create webhook   
      target_channel.createWebhook(target_username, {avatar: message.client.user.displayAvatarURL()})
      .then(webhook => addWebhook(message.guild.id, webhook.id, updates)); // save webhook id

},
};