import { Message } from 'discord.js';

const LINKS = new Map<string, string>();

LINKS.set('f', 'https://media.tenor.com/images/a32619ecea02c434d7cf8e13e8244e7b/tenor.gif');
LINKS.set('wow', 'https://img.ifunny.co/images/d4946a580ee750e051a338313b076dab12e95a3e9b28704141d79b93b2127c6f_1.gif');
LINKS.set('racky', 'https://tenor.com/view/%D0%B5%D0%BD%D0%BE%D1%82-%D1%82%D0%B0%D0%BD%D0%B5%D1%86-%D1%82%D0%B0%D0%BD%D1%86%D1%83%D1%8E%D1%89%D0%B8%D0%B9%D0%B5%D0%BD%D0%BE%D1%82-raccoon-dancing-raccoon-gif-21050992');

function gif(args: Array<string>, message: Message): void {
  const link = LINKS.get(args[0]) || '';

  message.channel.send(link);
}

export default {
  name: 'gif',
  description: 'send a gif',
  execute: gif,
};
