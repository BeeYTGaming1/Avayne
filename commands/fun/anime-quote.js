const discord = require('discord.js');
const axios = require('axios');

module.exports = {
name: 'anime-quote',
aliases: ['anime-q', 'animequote', 'animeq', 'ani-q'],
usage: '',
description: 'See some anime-quotes',
run: async (client, message, args) => {
    const url = 'https://animechan.vercel.app/api/random';

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`An error occured!`)
        }

        const embed = new discord.MessageEmbed()
            .setTitle(`Random Anime Quote`)
            .setDescription(data.quote)
            .setFooter(`Anime: ${data.anime} | Character: ${data.character}`)

        await message.channel.send(embed)

},
};