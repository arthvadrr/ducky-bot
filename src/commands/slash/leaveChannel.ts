import {
	CommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from "discord.js";
import { getVoiceConnection, VoiceConnection } from "@discordjs/voice";

/**
 * Command to make Ducky join a specified voice channel.
 */
export const command: SlashCommandOptionsOnlyBuilder = new SlashCommandBuilder()
	.setName("leave")
	.setDescription("Make Ducky leave a voice channel.",
	);

/**
 * Executes the /leave command.
 */
export async function execute(interaction: CommandInteraction): Promise<void> {
	if (interaction.guild) {
		const connection: VoiceConnection | undefined = getVoiceConnection(interaction.guild.id);

		if (connection) {
			await interaction.reply(`Leaving the channel! 🐥👟`);
			connection.destroy();
			console.log("Disconnect");
		}
	}
}