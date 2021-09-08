const Discord = require('discord.js');
const config = require('../../config.json');
const { getWebhook, getUpdatesWebhook } = require("../../helpers/database/db_helper");

module.exports = {
name: 'fetchwebhook',
aliases: [''],
usage: '',
description: 'Finds webhook of guild',
run: async (client, message, args) => {

    const webhook_id = getWebhook(message.guild.id);

    if (!webhook_id) {
        console.log(`error in fetchwebhook : webhook id is undefined`);
        return;
    }

    const target_webhook = await client.fetchWebhook(webhook_id);
    console.log(`target webhook url is ${target_webhook.url} and other info is : ${JSON.stringify(target_webhook)}`);

},
};