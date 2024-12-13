import { ChatInputCommandInteraction, Client, GatewayIntentBits, type Interaction } from "discord.js";
import { BOT_TOKEN } from "./config";
import { handleReady } from "./events/ready";
import { handleMessageCreate } from "./events/messageCreate";
import { execute as helloDucky } from "./commands/slash/helloDuckyWorld";
import { execute as joinChannel } from "./commands/slash/joinChannel";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

client.on("interactionCreate", async (interaction: Interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === "test") {
		await helloDucky(interaction);
	}

	if (commandName === "join") {
		await joinChannel(interaction as ChatInputCommandInteraction);
	}
});

client.once("ready", () => handleReady(client));
client.on("messageCreate", (message) => handleMessageCreate(message));
client.login(BOT_TOKEN).finally(() => console.log("Token successful!"));