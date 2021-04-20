import type {
  DMChannel, Guild, Message, NewsChannel, TextChannel, VoiceChannel,
} from 'discord.js';

import ytdl from 'ytdl-core-discord';
import search, { YouTubeSearchResults } from 'youtube-search';

import type { StreamPlayer } from '../interfaces/streamPlayer';

const players = new Map<string, StreamPlayer>();

async function searchVideo(terms: string): Promise<YouTubeSearchResults> {
  const { results } = await search(
    terms,
    {
      maxResults: 1,
      key: process.env.YOUTUBEKEY,
    },
  );

  return results[0];
}

async function playStream(guild: Guild) {
  const player = players.get(guild.id);

  if (!player) return;

  const song = player.songs.shift();

  if (!song) {
    player.voiceChannel.leave();
    players.delete(guild.id);
    return;
  }

  const stream = await ytdl(song.link);

  player.textChannel.send(`Tocando... ${song.title}`);

  player.dispatcher = (
    player
      .connection
      .play(stream, { type: 'opus' })
      .on('finish', () => {
        playStream(guild);
      })
      .on('error', (error) => {
        console.error(error);
        players.delete(guild.id);
      })
  );
}

type Channel = TextChannel | DMChannel | NewsChannel;

// eslint-disable-next-line max-len
async function createPlayer(textChannel: Channel, voiceChannel: VoiceChannel): Promise<StreamPlayer> {
  const connection = await voiceChannel.join();

  if (!connection) throw new Error('');

  return {
    textChannel,
    voiceChannel,
    connection,
    songs: [],
    volume: 1,
    playing: true,
    dispatcher: null,
  };
}

async function play(args: string[], message: Message): Promise<void> {
  const {
    channel,
    member,
    guild,
  } = message;

  if (!(member && guild)) return;

  if (!member.voice.channel) {
    channel.send('Hey, você não está em um canal de voz');
    return;
  }

  const player = players.get(guild.id);

  const video = await searchVideo(args.join());

  if (!player) {
    const newPlayer = await createPlayer(channel, member.voice.channel);

    newPlayer.songs.push(video);

    players.set(guild.id, newPlayer);

    playStream(guild);
    return;
  }

  channel.send(`${video.title} foi adicionado a fila`);
  player.songs.push(video);
}

function stop(args: string[], message: Message): void {
  const {
    channel,
    guild,
  } = message;

  if (!guild) return;

  const player = players.get(guild.id);
  if (!player) {
    channel.send('Bobo, não estou tocando música ainda');
    return;
  }

  player.connection.disconnect();
  players.delete(guild.id);

  channel.send('Até logo!');
}

function pause(args: string[], message: Message): void {
  const {
    channel,
    guild,
  } = message;

  if (!guild) return;

  const player = players.get(guild.id);
  if (!player) {
    channel.send('O nada foi pausado!');
    return;
  }

  if (!player.playing || !player.dispatcher) return;

  channel.send('Quieto estou...');
  player.dispatcher.pause();
}

function unpause(args: string[], message: Message): void {
  const {
    channel,
    guild,
  } = message;

  if (!guild) return;

  const player = players.get(guild.id);
  if (!player) {
    channel.send('O nada foi pausado!');
    return;
  }

  if (!player.playing || !player.dispatcher) return;

  channel.send('De volta com a programação normal!');
  player.dispatcher.resume();
}

// its broken
function skip(args: string[], message: Message): void {
  const {
    channel,
    guild,
  } = message;

  if (!guild) return;

  const player = players.get(guild.id);
  if (!player || !player.dispatcher) {
    channel.send('Pular o quê?');
    return;
  }

  channel.send('Passando...');
  player.dispatcher.end();
  playStream(guild);
}

function volume(args: string[], message: Message): void {
  const {
    channel,
    guild,
  } = message;

  if (!guild) return;

  const player = players.get(guild.id);
  if (!player || !player.dispatcher) {
    channel.send('Nada foi alterado');
    return;
  }

  const newVolume = parseFloat(args[0]);

  player.volume = newVolume;
  player.dispatcher.setVolumeLogarithmic(newVolume);
}

function yt(args: string[], message: Message): void {
  const action = args.shift();
  switch (action) {
    case 'play':
      play(args, message);
      break;
    case 'stop':
      stop(args, message);
      break;
    case 'pause':
      pause(args, message);
      break;
    case 'unpause':
      unpause(args, message);
      break;
    case 'skip':
      skip(args, message);
      break;
    case 'volume':
      volume(args, message);
      break;
    default:
      play(args, message);
      break;
  }
}

export default {
  name: 'yt',
  description: 'yt',
  execute: yt,
};
