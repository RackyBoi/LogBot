import type { Message } from 'discord.js';

function me(args: Array<string>, message : Message): void {
  const {
    author,
  } = message;

  message.reply(`
    ${author.username}\n
    Você entrou no dia ${author.createdAt}\n
    O link do seu avatar é ${author.displayAvatarURL()}
  `);
}

export default {
  name: 'me',
  description: 'Mostra infos do usuário',
  execute: me,
};
