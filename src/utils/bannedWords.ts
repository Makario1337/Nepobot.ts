import { db } from "./globals"

interface WordOnlyColumn {
    word: string
}

export let bannedWords: RegExp

const chars = {
    a: "[aаạąäàáą]",
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
            regexWords.push(regexWord)
        }
    }
    bannedWords = buildRegex("gmi", ...regexWords)
}

function updateBannedWordsCallback(error: Error | null, rows: WordOnlyColumn[]) {
    if (error) {
        console.warn(error)
        return
    }

    const words = rows.map(row => row.word)
    setBannedWords(words)
}

// Combines multiple regexp and their flags
function buildRegex(flags: string, ...args: Array<RegExp | string>): RegExp {
    args.forEach((arg) => {
        if (typeof arg != "string")
            [...arg.flags].forEach((flag) => {
                if (flags.indexOf(flag) < 0)
                    return
                flags += flag
            })
    })

    return new RegExp(args.map(arg => typeof arg == "string" ? arg : arg.source).join("|"), flags)
}
