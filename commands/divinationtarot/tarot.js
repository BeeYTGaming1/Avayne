const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
name: 'tarot',
aliases: [''],
usage: 'tarot <cmd>',
description: 'Divination tarot',
run: async (client, message, args) => {
    const data = require("../../data/card_data.json");
    let cardNumber = 0;
    let upOrDown = 0;
    if(!args[0]) {
        return message.channel.send("Type \`tarot help\` to know more infomation.")
    }
    if (args[0] === "draw") {
      cardNumber = Math.floor(Math.random() * 77);
      upOrDown = Math.floor(Math.random() * 2);
      if (upOrDown === 0) {
        message.channel.send(
          "**" +
            data.cards[cardNumber].name +
            "**, Upright🔺\n" +
            data.cards[cardNumber].meaning_up
        );
      } else {
        message.channel.send(
          "**" +
            data.cards[cardNumber].name +
            "**, Reverse🔻\n" +
            data.cards[cardNumber].meaning_rev
        );
      }
    } else if (args[0] === "spread") {
      const spreadLabels = [
        "**__Past:__** \n",
        "**__Present:__** \n",
        "**__Hidden Influence:__** \n",
        "**__Advice:__** \n",
        "**__Possible Outcome:__** \n",
      ];
      let spreadResults = [];
      // for (let i = 0; i < 5; i++) {
      let counter = 0;
      while (counter < 5) {
        cardNumber = Math.floor(Math.random() * 77);
        upOrDown = Math.floor(Math.random() * 2);
        let cardNumberArray = [];
        if (cardNumberArray.includes(cardNumber)) {
          continue;
        } else if (upOrDown === 0) {
          spreadResults.push(
            spreadLabels[counter] +
              "**" +
              data.cards[cardNumber].name +
              "**, Upright🔺\n" +
              data.cards[cardNumber].meaning_up +
              "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
          );
          counter++;
        } else {
          spreadResults.push(
            spreadLabels[counter] +
              "**" +
              data.cards[cardNumber].name +
              "**, Reverse🔻\n" +
              data.cards[cardNumber].meaning_rev +
              "\n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-"
          );
          counter++;
        }
      }
      message.channel.send(spreadResults);
    } else if (args[0] === "help") {
      message.channel.send(
        "__**Commands List**__\n\`tarot draw\`: Draw one Tarot card; includes orientation and description.\n\`tarot spread\`: Draws five cards in a simple spread: Past, Present, Hidden Influences, Advice, and Possible Outcomes."
      );
    }

},
};