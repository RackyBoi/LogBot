import { Message } from 'discord.js';

function pong(args: Array<string>, message : Message): void {
  const sendDate = message.createdTimestamp;
  const now = Date.now();

  message.channel.send(`Pong! ${now - sendDate} ms`);
}

export default {
  name: 'ping',
  description: 'Teste',
  execute: pong,
};
