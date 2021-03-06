const Discord = require('discord.js');
const Canvas = require('canvas');
module.exports = {
    name : 'dababy',
run : async (client, message, args) => {
    const member = message.mentions.members.first() || message.member;
    const canvas = Canvas.createCanvas(867, 892);
    const ctx = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://i.kym-cdn.com/photos/images/newsfeed/002/043/165/0ee.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 270, 300, 300, 320);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ARCHIE.jpg');
    message.channel.send(attachment);
   }
}