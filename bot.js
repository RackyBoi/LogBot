require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const TOKEN = process.env.TOKEN;

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
})

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.author.bot) return

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase();
    
    try {
        console.info(`Called command: ${command}`);
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.channel.send('Ops, eu escorreguei em alguns bits!');
        return
    }
});