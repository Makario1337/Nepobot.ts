import { Client } from "discord.js"

function onReady(client: Client): void {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            console.warn("user login failed")
            return
        }

        console.log(`logged in as ${client.user.username}`)
    })
}

export default (onReady)
