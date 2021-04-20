import type { DMChannel, NewsChannel, StreamDispatcher, TextChannel, VoiceChannel, VoiceConnection } from 'discord.js';
import type { YouTubeSearchResults } from 'youtube-search';

export interface StreamPlayer {
  textChannel: TextChannel | DMChannel | NewsChannel,
  voiceChannel: VoiceChannel,
  connection: VoiceConnection,
  dispatcher: StreamDispatcher | null,
  songs: YouTubeSearchResults[],
  volume: number,
  playing: boolean
}
