import type { Message } from 'discord.js';

export interface Command {
  name: string,
  description: string,
  execute(args: Array<string>, message: Message): void
}
