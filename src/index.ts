import { Client, GatewayIntentBits } from "discord.js"
import * as dotenv from 'dotenv'
import onReady from "./listeners/ready"
import onMessageCreated from "./listeners/messageCreate"

dotenv.config({ path: './.env' })

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})

onReady(client)
onMessageCreated(client)

client.login(process.env.DISCORD_TOKEN)
