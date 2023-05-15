import { Client } from 'discord.js'
import { umask } from 'process'

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

// TODO: read from config? or db
const regex: Array<RegExp | string> = [
    `${chars.n}${chars.i}${chars.g}{2,}${chars.e}${chars.r}`
]

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

    console.log(args.map(arg => typeof arg == "string" ? arg : arg.source).join("|"))

    return new RegExp(args.map(arg => typeof arg == "string" ? arg : arg.source).join("|"), flags)
}

function onMessageCreated(client: Client): void {
    // console.log(buildRegex("gmi", ...regex).test("nigggÈr"))
    client.on('messageCreate', async (message) => {
        const filter = buildRegex("gmi", ...regex)
        if(filter.test(message.content))
        {
            console.log("bad word found")
        }
    })
}

export default (onMessageCreated)
