
import * as dotenv from "dotenv";
import * as Discord from "discord.js"

dotenv.config({ path: __dirname+'/.env' });

const TOKEN = process.env['TOKEN'];

const BOT = new Discord.Client();

BOT.login(TOKEN);

BOT.on('ready', () => {
  console.log(`Logged as ${BOT.user?.tag}`)
});

BOT.on('message', (message) => {
  console.log(message.content);
});