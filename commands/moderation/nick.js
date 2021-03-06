const decancer = require('decancer');
module.exports = {
  name: 'nick',
  description: "Nick a user. You can use \`%username%\` to reset nickname\nYou can use \`%discriminator%\` to get the descriminator\nYou can use \`%tag%\` to get the username with the discriminator\nYou can use \`%id%\` to get the id\nYou can use \`%oldNickname%\` to get the old nickname\nYou can use \`%decancer_username%\` to remove non-latin characters from the user's username\nYou can use \`%decancer_oldnickname%\` to remove non-latin characters from member's old nickname",
  aliases: ['nickname'],
  usage: "nick <user><new nickname>",
  run: async(client, message, args) => {
      if(!message.member.hasPermission("MANAGE_NICKNAMES")) {
          return message.channel.send("You do not have perm to do this. You need \`Manage Nicknames\`!")
      }
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let nickname = args.slice(1).join(" ");
    if(!user) return message.channel.send(`Specify a valid user or user ID`);
    if(!nickname) return message.channel.send(`Specify a nickname`);
    let member = user;
    user = user.user;
    nickname = nickname.replace("%username%", user.username);
    nickname = nickname.replace("%discriminator%", user.discriminator);
    nickname = nickname.replace("%id%", user.id);
    nickname = nickname.replace("%tag%", user.tag);
    nickname = nickname.replace("%oldNickname%", member.nickname ? member.nickname : user.username);
    nickname = nickname.replace("%decancer_username%", decancer(user.username));
    nickname = nickname.replace("%decancer_tag%", decancer(user.tag));
    nickname = nickname.replace("%decancer_oldNickname%", decancer(member.nickname ? member.nickname : user.username));
    if(member.nickname === nickname) return message.channel.send(`**${member.displayName}**'s nickname is already **${nickname}**`)
    try {
      await member.setNickname(nickname);
      await message.channel.send(`Successfully set **${user.tag}**'s nickname as **${nickname}**`);
    } catch (err) {
      await message.channel.send(`An error occured trying to set ${user.tag}'s nickname.\n${err.message}`)
    }
  }
}
