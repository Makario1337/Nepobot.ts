import { Client } from 'discord.js'
import { bannedWords } from '../utils/bannedWords'

function onMessageCreated(client: Client): void {
    client.on('messageCreate', async (message) => {
        if (message.author == client.user) {
            return
        }

        console.log(bannedWords, message.content, bannedWords.test(message.content), message.deletable, (bannedWords.test(message.content) && message.deletable))

        if (bannedWords.test(message.content.trim()) && message.deletable) {
            await message.delete()
        }
    })
}

export default (onMessageCreated)
