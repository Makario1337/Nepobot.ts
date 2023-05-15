import { Client } from "discord.js"
import * as dotenv from 'dotenv'
import onReady from "./listeners/ready"

dotenv.config({ path: './.env' })

const client = new Client({
    intents: []
})

onReady(client)

client.login(process.env.DISCORD_TOKEN)
