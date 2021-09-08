
const { Calculator } = require('weky');

const discord = require('discord.js');

module.exports = {
name: 'math',
aliases: ['maths'],
usage: 'Open Calulator',
description: '',
run: async (client, message, args) => {
    await Calculator(message)

},
};