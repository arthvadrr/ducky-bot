import { Message } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import ytdl from 'ytdl-core';

export const execute = async (message: Message, args: string[]) => {
	const voiceChannel = message.member?.voice.channel;
	if (!voiceChannel) {
		return message.reply('You need to be in a voice channel to play music!');
	}

	const songUrl = args[0];
	if (!songUrl || !ytdl.validateURL(songUrl)) {
		return message.reply('Please provide a valid YouTube URL.');
	}

	const connection = joinVoiceChannel({
		channelId: voiceChannel.id,
		guildId: voiceChannel.guild.id,
		adapterCreator: voiceChannel.guild.voiceAdapterCreator,
	});

	const stream = ytdl(songUrl, { filter: 'audioonly' });
	const resource = createAudioResource(stream);
	const player = createAudioPlayer();

	player.play(resource);
	connection.subscribe(player);

	message.channel.send(`Now playing: ${songUrl}`);
};