import dotenv from 'dotenv'

dotenv.config()

export const BOT_TOKEN = process.env.DISCORD_TOKEN || ''
export const DEFAULT_VOLUME = parseFloat(process.env.DEFAULT_VOLUME || '1.0')
export const GUILD_ID = process.env.GUILD_ID || ''
export const APPLICATION_ID = process.env.APPLICATION_ID || '';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'info'