import { Client } from 'discord.js';

export const handleReady: (client: Client<boolean>) => void  = (client: Client): void => {
	console.log(`${client.user?.tag} is online!`);
};