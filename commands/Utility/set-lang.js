const mongo = require('../../mongo');
const guildSchema = require('../../models/Guild');
const { languages } = require('../../data/lang.json');
const { setLanguage } = require('../../data/language')
const language = require('../../data/language')



module.exports = {
    name: 'set-language',
    description: 'Change Language of the bot',
    aliases: ['language', 'lang', 'setlang'],
    usage: '<Language>',
    run: async(client, message, args) => {

        const {guild} = message;
        const targetLanguage = args[0].toLowerCase();
        if (!languages.includes(targetLanguage)) {
            message.reply('That language is not supported.')
            return
        }

        setLanguage(guild, targetLanguage)

        await mongo().then(async (mongoose) => {
            try {
                await guildSchema.findOneAndUpdate(
                    {
                        _id: guild.id,
                    },
                    {
                        _id: guild.id,
                        language: targetLanguage,
                    },
                    {
                        upsert: true,
                    }
                )
                message.reply(language(message.guild, "SET_LANGUAGE_SUCCEED").replace("{language}",targetLanguage))
            } finally {
                await mongoose.connection.close()
            }
        })
    },
};