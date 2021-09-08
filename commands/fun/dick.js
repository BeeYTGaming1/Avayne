module.exports = {
    name: "pennis",
    aliases: ["pp", "dick", "d1ck"],
    description: "Show pp distance",
    run: async(client, message, args) => {
    member = message.mentions.users.first() || message.author
    if (!member.id) return message.reply("`❌` That member cannot be found on this server.", { allowedMentions: { repliedUser: false } });
  
      const clientAuthor = member.id === message.client.user.id;
      const size = clientAuthor ? message.author.id : member.id.slice(-3) % 20 + 6;
  
      message.reply(`\`${size} cm\` 8${'='.repeat(size)}D 💦💦💦`, { allowedMentions: { repliedUser: false } });
    }
  };