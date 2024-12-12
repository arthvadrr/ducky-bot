import { REST, Routes } from 'discord.js';
import { command as helloDuckyWorld } from './commands/slash/helloDuckyWorld';
import { APPLICATION_ID, BOT_TOKEN, GUILD_ID } from './config';

function validateEnvironmentVariables(): void {
	if (!APPLICATION_ID || !BOT_TOKEN || !GUILD_ID) {
		console.error('Missing required environment variables: APPLICATION_ID, BOT_TOKEN, or GUILD_ID.');
		process.exit(1);
	}
}

function validateCommand(command: typeof helloDuckyWorld): void {
	if (!command.name || !command.description) {
		console.error('Invalid command detected:', command);
		process.exit(1);
	}
}

function createCommandsArray(): unknown[] {
	try {
		validateCommand(helloDuckyWorld);
		return [helloDuckyWorld.toJSON()];
	} catch (error) {
		console.error('Error validating commands:', error);
		process.exit(1);
	}
}

async function registerCommands(): Promise<void> {
	const commands = createCommandsArray();
	const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
			body: commands,
		});

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error('Error refreshing application (/) commands:', error);
		throw error;
	}
}

async function main(): Promise<void> {
	try {
		validateEnvironmentVariables();
		await registerCommands();
		console.log('Commands registered successfully!');
	} catch (error) {
		console.error('Failed to register commands:', error);
	} finally {
		process.exit();
	}
}

main();