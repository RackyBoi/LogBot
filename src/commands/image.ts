import type { Message } from 'discord.js';

import sharp from 'sharp';
import { MessageAttachment } from 'discord.js';

import downloadImage from '../utils/downloadImage';

async function image(args: Array<string>, message: Message): Promise<void> {
  const file = message.attachments.array().pop();

  if (!file) {
    message.channel.send('Você precisa enviar uma imagem!');
    return;
  }

  const width = args.find((arg) => arg.startsWith('resizewidth:')) || 'undefined';
  const heigth = args.find((arg) => arg.startsWith('resizeheigth:')) || 'undefined';

  const attachment = new MessageAttachment(
    await sharp(await downloadImage(file.url))
      .grayscale(args.includes('grayscale'))
      .flip(args.includes('flip'))
      .flop(args.includes('flop'))
      .blur(args.includes('blur'))
      .resize(
        Number.isNaN(width) ? undefined : parseInt(width.replace('resizewidth:', ''), 10),
        Number.isNaN(heigth) ? undefined : parseInt(heigth.replace('resizeheigth:', ''), 10),
      )
      .toFormat('png')
      .toBuffer(),
  );

  message.channel.send(attachment);
}

export default {
  name: 'image',
  description: 'image',
  execute: image,
};
