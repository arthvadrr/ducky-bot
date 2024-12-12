import { Message, TextChannel } from "discord.js";
import { createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import ytdl from "ytdl-core";

export const execute = async (message: Message, args: string[]) => {
	try {
		const voiceChannel = message.member?.voice.channel;
		if (!voiceChannel) {
			return message.reply("You need to be in a voice channel to play music!");
		}

		const songUrl = args[0];
		if (!songUrl || !ytdl.validateURL(songUrl)) {
			return message.reply("Please provide a valid YouTube URL.");
		}

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: voiceChannel.guild.voiceAdapterCreator,
		});

		const stream = ytdl(songUrl, { filter: "audioonly" });
		const resource = createAudioResource(stream);
		const player = createAudioPlayer();

		player.play(resource);
		connection.subscribe(player);

		if (message.channel instanceof TextChannel) {
			await message.channel.send(`Now playing: ${songUrl}`);
		} else {
			console.error("Message channel is not a TextChannel, unable to send message.");
		}
	} catch (error) {
		console.error("An error occurred while executing the play command:", error);
		if (message.channel instanceof TextChannel) {
			message.channel.send("An error occurred while trying to play the music. Please try again.");
		}
	}
};