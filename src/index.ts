import { Client, GatewayIntentBits } from "discord.js"
import * as dotenv from 'dotenv'
import onReady from "./listeners/ready"
import onMessageCreated from "./listeners/messageCreate"
import { db, InitGlobals } from "./utils/globals"

dotenv.config({ path: './.env' });

InitGlobals()

db.exec(
    `CREATE TABLE IF NOT EXISTS "badwords"
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word VARCHAR(100) NOT NULL
    );`
    )
    
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
