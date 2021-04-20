import { Message } from "discord.js";
import commands from '../commands/colection';

const {
  PREFIX
} = process.env

function invokeCommand(
  command: string,
  args: Array<string>,
  message: Message
) {
  console.info(`${message.author.username} invoked command: ${command} ${args}`);

  const func = commands.get(command);

  if(func) {
    func.execute(args, message);
  } else {
    message.channel.send('Meu pai ainda não me ensinou a fazer isso!');
  }
}

export default (message: Message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith('.')) return;

  const args = message.content.split(/ +/);
  const command = args.shift()?.toLowerCase().substring(1) || '';


  invokeCommand(command, args, message);
}