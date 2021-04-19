require('dotenv').config();
const Discord = require('discord.js');
const BOT = new Discord.Client();

BOT.commands = new Discord.Collection();
const BOTCommands = require('./commands');

Object.keys(BOTCommands).map(key => {
    BOT.commands.set(BOTCommands[key].name, BOTCommands[key]);
})

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

module.exports = {
    BOT,
    TOKEN,
    PREFIX,
}