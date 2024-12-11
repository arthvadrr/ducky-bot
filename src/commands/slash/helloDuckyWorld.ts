import { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export const command = new SlashCommandBuilder()
	.setName('test')
	.setDescription('Ducky, are you there!?')

export const execute = async (interaction: CommandInteraction): Promise<void> => {
	try {
		await interaction.reply(`Quack! Slowness timer: ${interaction.client.ws.ping}ms`)
	} catch (error) {
		console.error('Error handling /test command:', error)

		if (!interaction.deferred && !interaction.replied) {
			await interaction.reply({ content: 'An error occurred while executing the command.', ephemeral: true })
		}
	}
}