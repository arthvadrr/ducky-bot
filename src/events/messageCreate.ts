import { Message } from "discord.js";

export const handleMessageCreate = async (message: Message) => {
	if (!message.content.startsWith("!") || message.author.bot) return;

	const args = message.content.slice(1).split(" ");
	const command = args.shift()?.toLowerCase();

	if (command === "play") {
		const { execute } = await import("../commands/music/play");
		await execute(message, args);
	}
};