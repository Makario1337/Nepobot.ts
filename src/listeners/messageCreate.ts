import { Client } from 'discord.js'
import { bannedWords } from '../utils/bannedWords'

function onMessageCreated(client: Client): void {
    client.on('messageCreate', async (message) => {
        if (message.author == client.user) {
            return
        }

        const content = message.content.trim()

        if (bannedWords.test(content) && message.deletable) {
            await message.delete()
        }
    })
}

export default (onMessageCreated)
