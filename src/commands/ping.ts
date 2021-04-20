import { Message } from "discord.js"

function pong(args: Array<string>, message : Message) {
  const sendDate = message.createdTimestamp;
  const now = Date.now();

  message.channel.send(`${now - sendDate} ms`);
}

export default {
  name: 'ping',
  description: 'Teste',
  execute: pong
}