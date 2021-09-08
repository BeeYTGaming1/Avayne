const guildSchema = require("../models/Guild.js");
const mongo = require('../mongo');

module.exports = {
    name: 'guildCreate',
    async execute(guild ,client) {
        await mongo().then(async (mongoose) => {
            try {
                await guildSchema.findOneAndUpdate(
                    {
                        id: guild.id,
                    },
                    {
                        id: guild.id,
                        language: "english",
                        prefix: ";",
                        invite_leaderboard: false,
                    },
                    {
                        upsert: true,
                    }
                )
            } finally {
                await mongoose.connection.close()
            }
        })
    }
};