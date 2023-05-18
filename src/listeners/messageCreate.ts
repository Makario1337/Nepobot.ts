import { Client } from 'discord.js'
import { bannedWords } from '../utils/bannedWords'

function onMessageCreated(client: Client): void {
    client.on('messageCreate', async (message) => {
        if (message.author == client.user) {
            return
        }

        if (bannedWords.test(message.content) && message.deletable) {
            message.delete()
        }
    })
}

export default (onMessageCreated)
