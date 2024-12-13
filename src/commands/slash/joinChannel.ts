import {
	ChannelType,
	ChatInputCommandInteraction,
	GuildMember,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	VoiceChannel,
} from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

/**
 * Command to make Ducky join a specified voice channel.
 */
export const command: SlashCommandOptionsOnlyBuilder = new SlashCommandBuilder()
	.setName("join")
	.setDescription("Make Ducky join a voice channel.")
	.addChannelOption(option => {

			return option
				.setName("channel")
				.setDescription("The voice channel for Ducky to join")
				.setRequired(true);
		},
	);

/**
 * Executes the /join command.
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {

	const targetChannel: VoiceChannel = interaction.options.getChannel("channel", true);

	console.log("JOIN EXEC");

	if (!targetChannel || !interaction.guild) {
		await interaction.reply("Uh-oh, I can’t find that channel! Did you imagine it? 🦆");
		return;
	}

	if (targetChannel.type === ChannelType.GuildVoice || targetChannel.type === ChannelType.GuildStageVoice) {
		const guildMember = interaction.guild.members.me as GuildMember;

		if (!guildMember.permissionsIn(targetChannel).has("Connect")) {
			await interaction.reply("I can't join that channel! 🦆 Maybe let me in?");
			return;
		}

		try {
			await interaction.reply(`Quack! I’ve waddled into ${targetChannel.name}. 🦆`);

			joinVoiceChannel({
				channelId: targetChannel.id,
				guildId: targetChannel.guild.id,
				adapterCreator: targetChannel.guild.voiceAdapterCreator
			})

		} catch (error) {
			console.error("Error joining voice channel:", error);
			await interaction.reply("Oops! Something went wrong while trying to join. 🦆");
		}
	} else {
		await interaction.reply("That’s not a voice channel! 🦆 Do I look like I can text-chat?");
	}
}