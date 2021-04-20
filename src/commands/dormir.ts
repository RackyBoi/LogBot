import type { Message } from "discord.js"
import BOT from "../bot"

async function dormir(args: Array<string>, message : Message) {
  // mudar verificação para fora
  if(message.author.id === '247717965414268961') {
    await message.channel.send('a mimir 💤');
    BOT.destroy();
  }
}

export default {
  name: 'dormir',
  description: 'Desligar o bot',
  execute: dormir
}