import { db } from "./globals"

interface WordOnlyColumn {
    word: string
}

export let bannedWords: RegExp

const chars = {
    a: "[aаạąäàáąáà]",
    b: "[b]",
    c: "[cсƈċ]",
    d: "[dԁɗ]",
    e: "[eеẹėéè]",
    f: "[f]",
    g: "[gġ]",
    h: "[hһ]",
    i: "[iіíï]",
    j: "[jјʝ]",
    k: "[kκ]",
    l: "[lӏḷ]",
    m: "[m]",
    n: "[nո]",
    o: "[oоοօȯọỏơóòö]",
    p: "[pр]",
    q: "[qզ]",
    r: "r",
    s: "[sʂ]",
    t: "[t]",
    u: "[uυսüúù]",
    v: "[vνѵ]",
    w: "[w]",
    x: "[xхҳ]",
    y: "[уý]",
    z: "[zʐż]"
}

// fetch all banned words again and update the assembled regex
export function updateBannedWords() {
    db.all<WordOnlyColumn>("SELECT word FROM badwords", updateBannedWordsCallback)
}

export function setBannedWords(words: string[]) {
    const regexWords: string[] = []
    for (const word of words) {
        let regexWord = ""
        for (const char of word) {
            if (char in chars)
                regexWord += (chars as any)[char] // casting is fine here because it has already been checked if the index exists
            else
                regexWord += char
        }
        regexWords.push(regexWord)
    }
    console.log(regexWords)
    bannedWords = new RegExp(regexWords.map(word => `(${word})`).join("|"), "mi")
}

function updateBannedWordsCallback(error: Error | null, rows: WordOnlyColumn[]) {
    if (error) {
        console.warn(error)
        return
    }

    const words = rows.map(row => row.word)
    setBannedWords(words)
}
