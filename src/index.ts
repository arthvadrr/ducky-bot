import { Client, GatewayIntentBits, Interaction } from 'discord.js';
import { BOT_TOKEN } from './config'
import { handleReady } from './events/ready';
import { handleMessageCreate } from './events/messageCreate';
import { execute } from './commands/slash/helloDuckyWorld';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "test") {
		await execute(interaction);
	}
});

client.once('ready', () => handleReady(client))
client.on('messageCreate', (message) => handleMessageCreate(message));
client.login(BOT_TOKEN).finally(() => console.log('Token successful!'));