import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { handleReady } from './events/ready';
import { handleMessageCreate } from './events/createMessage';

dotenv.config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
});

client.once('ready', () => handleReady(client));
client.on('messageCreate', (message) => handleMessageCreate(message, client));
client.login(process.env.DISCORD_TOKEN);