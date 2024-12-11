import { Client } from 'discord.js';

export const handleReady = (client: Client) => {
	console.log(`${client.user?.tag} is online!`);
};