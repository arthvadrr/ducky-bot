import { ChannelType, ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";

/**
 * Command to make Ducky join a specified voice channel.
 */
export const command = new SlashCommandBuilder()
	.setName("join")
	.setDescription("Make Ducky join a voice channel.")
	.addChannelOption(option =>
		option
			.setName("channel")
			.setDescription("The voice channel for Ducky to join")
			.setRequired(true),
	);

/**
 * Executes the /join command.
 *
 * @param {ChatInputCommandInteraction} interaction - The interaction object.
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
	const channel: any = interaction.options.getChannel("channel");

	if (!channel || !interaction.guild) {
		await interaction.reply("Uh-oh, I can’t find that channel! Did you imagine it? 🦆");
		return;
	}

	if (channel.type === ChannelType.GuildVoice || channel.type === ChannelType.GuildStageVoice) {
		const guildMember = interaction.guild.members.me as GuildMember;

		if (!guildMember.permissionsIn(channel).has("Connect")) {
			await interaction.reply("I can't join that channel! 🦆 Maybe let me in?");
			return;
		}

		try {
			await interaction.reply(`Quack! I’ve waddled into ${channel.name}. 🦆`);
		} catch (error) {
			console.error("Error joining voice channel:", error);
			await interaction.reply("Oops! Something went wrong while trying to join. 🦆");
		}
	} else {
		await interaction.reply("That’s not a voice channel! 🦆 Do I look like I can text-chat?");
	}
}