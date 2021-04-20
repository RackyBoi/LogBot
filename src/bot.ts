import * as dotenv from 'dotenv';
import * as Discord from 'discord.js';

import onMessage from './events/onMessage';

dotenv.config({ path: `${__dirname}/.env` });

const { TOKEN } = process.env;
const BOT = new Discord.Client();

BOT.login(TOKEN);

BOT.on('ready', () => {
  console.log(`Logged as ${BOT.user?.tag}`);
});

BOT.on('message', onMessage);

export default BOT;
