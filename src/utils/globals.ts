import { Database } from 'sqlite3'
import { updateBannedWords } from './bannedWords'

export const db = new Database('db.sqlite')

export function InitGlobals() {
    updateBannedWords()
}
