import { Client } from "discord.js"
import * as dotenv from 'dotenv'

console.log("Bot is starting")

dotenv.config({ path: './.env' })

const client = new Client({
    intents: []
})

console.log(client)

console.log(process.env.DISCORD_TOKEN)