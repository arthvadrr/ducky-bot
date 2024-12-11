import { REST, Routes } from 'discord.js'
import { command as helloDuckyWorld } from './commands/slash/helloDuckyWorld'
import { APPLICATION_ID, BOT_TOKEN, GUILD_ID } from './config'

if (!APPLICATION_ID || !BOT_TOKEN || !GUILD_ID) {
	console.error('Missing required environment variables: APPLICATION_ID, BOT_TOKEN, or GUILD_ID.')
	process.exit(1)
}

if (!helloDuckyWorld.name || !helloDuckyWorld.description) {
	console.error('Invalid command detected:', helloDuckyWorld)
	process.exit(1)
}

const commands = [helloDuckyWorld.toJSON()];


const rest = new REST({ version: '10' }).setToken(BOT_TOKEN || '');

export const registerCommands = async () => {
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(
			Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
			{ body: commands }
		)

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error('Error refreshing application (/) commands:', error)
	}
}

registerCommands()
	.then(() => console.log('Commands registered successfully!'))
	.catch((error) => console.error('Failed to register commands:', error))
	.finally(() => process.exit())