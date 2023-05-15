import { Client } from "discord.js"
import { Database } from 'sqlite3'
import * as dotenv from 'dotenv'
import onReady from "./listeners/ready"
import onMessageCreated from "./listeners/messageCreate"

dotenv.config({ path: './.env' });
const db = new Database('db.sqlite');

db.exec(
    `CREATE TABLE IF NOT EXISTS "badwords"
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word VARCHAR(100) NOT NULL
    );`
)

const client = new Client({
    intents: [
        "DirectMessages",
        "GuildMessages",
    ]
})

onReady(client)
onMessageCreated(client)

client.login(process.env.DISCORD_TOKEN)
