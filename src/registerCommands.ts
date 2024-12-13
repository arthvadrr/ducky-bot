import { REST, Routes } from 'discord.js';
import { command as helloDuckyWorld } from './commands/slash/helloDuckyWorld';
import { command as joinChannel } from './commands/slash/joinChannel';
import { command as leaveChannel } from './commands/slash/leaveChannel';
import { APPLICATION_ID, BOT_TOKEN, GUILD_ID } from './config';

/**
 * Validates required environment variables.
 * Exits the process if any variables are missing.
 */
function validateEnvironmentVariables(): void {
	if (!APPLICATION_ID || !BOT_TOKEN || !GUILD_ID) {
		console.error('Missing required environment variables: APPLICATION_ID, BOT_TOKEN, or GUILD_ID.');
		process.exit(1);
	}
}

/**
 * Validates a command object for required properties.
 * Exits the process if the command is invalid.
 */
function validateCommand(command: typeof helloDuckyWorld): void {
	if (!command.name || !command.description) {
		console.error('Invalid command detected:', command);
		process.exit(1);
	}
}

/**
 * Creates an array of commands to be registered.
 * Exits the process if command validation fails.
 */
function createCommandsArray(): unknown[] {
	try {
		validateCommand(helloDuckyWorld);
		return [helloDuckyWorld.toJSON(), joinChannel.toJSON(), leaveChannel.toJSON()];
	} catch (error) {
		console.error('Error validating commands:', error);
		process.exit(1);
	}
}

/**
 * Registers application commands with the Discord API.
 * Logs progress and errors during the registration process.
 */
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

/**
 * Main entry point for the application.
 * Validates environment variables, registers commands, and handles errors.
 */
async function main(): Promise<void> {
	try {
		validateEnvironmentVariables();

		await registerCommands();

		console.log('Commands registered successfully!');
	} catch (error) {
		console.error('Failed to register commands:', error);
	} finally {
		console.log('Exiting...');
		process.exit();
	}
}

void main();