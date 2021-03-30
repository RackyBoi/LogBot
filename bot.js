require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
const botCommands = require('./commands');

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
})

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.author.bot) return
    if(!msg.content.startsWith(PREFIX)) return

    const args = msg.content.split(/ +/);
    const command = args.shift().toLowerCase().substring(1);
    
    try {
        if (!bot.commands.has(command)) {
            msg.reply('Esse comando não existe')
            return
        }
        console.info(`${msg.author.username} Called command: ${command} ${args} at ${msg.channel.name}`);
        bot.commands.get(command).execute(msg, args);
    } catch (error) {
        msg.channel.send('Ops, eu tropecei em alguns fios!');
        return
    }
});