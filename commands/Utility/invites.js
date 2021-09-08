const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "check-invites",
  aliases: [""],
  description: "Check your invites in the server!",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    const user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let Inv = [];
    const invites = await message.guild.fetchInvites();
    const userInvites = invites.array().filter((o) => {
      if (Inv.includes(o.targetUser)) return;
      Inv.push(o.targetUser);

      return o.inviter.id === user.id;
    });
    let userInviteCount = 0;
    for (let i = 0; i < userInvites.length; i++) {
      var invite = userInvites[i];
      userInviteCount += invite["uses"];
    }
    message.lineReply(`${user.user.tag} has ${userInviteCount} invites.`);
  },
};