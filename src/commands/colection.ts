import * as commands from '.';

import type { Command } from '../interfaces/command';

const commandsMap = new Map<string, Command>();

Object.entries(commands).forEach((entry) => {
  commandsMap.set(entry[0], entry[1]);
});

export default commandsMap;
