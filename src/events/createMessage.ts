import type { Message, Client } from 'discord.js';

export const handleCreateMessage = async (message: Message, client: Client) => {
	if (!message.content.startsWith('!') || message.author.bot) return;

	const args = message.content.slice(1).split(' ');
	const command = args.shift()?.toLowerCase();

	if (command === 'play') {
		await import('../commands/music/play').then((mod) => mod.execute(message, args, client));
	}
};