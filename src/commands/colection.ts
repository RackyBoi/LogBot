import { Message } from 'discord.js';

import * as commands from './';

interface Command {
  name: string,
  description: string,
  execute(args: Array<string>, message: Message): void
}

const commandsMap = new Map<string, Command>();

for(const [key, value] of Object.entries(commands)) {
  commandsMap.set(key, value);
}

export default commandsMap;