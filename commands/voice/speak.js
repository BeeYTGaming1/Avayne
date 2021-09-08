const { getAudioUrl } = require("google-tts-api");
const Discord = require("discord.js");
const { connection } = require("mongoose");

module.exports = {
    name: "speak",
    aliases: ["s"],
    usage: "<prefix>speak <lang> <text>",
    description: "Text to speech in voice channel",
    run: async(client, message, args) => {
        const lang = args.shift();
        if(!lang) return message.reply(`Pls specify the language you want to use, Ex: \`en hello\``)
        const string = args.join(" ");
        if(!string) return message.reply(`Pls specify the text! Ex: \`en hello\``)
        if (string.length > 200) return message.channel.send("Please enter less than 200 characters");
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.reply('You must be in voice channel to use command!');
        const audioURL = await getAudioUrl(string, { 
            lang: lang,
            slow: false,
            host: "https://translate.google.com",
            timeout: 10000
        }); 
        try {
            voiceChannel.join().then(async connection => {
                const dispatcher = connection.play(audioURL);
                const e = await message.react('🎙️');
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                    e.remove();
                }) 
        })
        }

        catch(e) {
            message.channel.send('An error occurred');
            console.error(e);
        }
    }
}