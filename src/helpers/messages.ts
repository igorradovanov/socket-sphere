//Helper message functions

interface Message {
    name: string,
    text: string,
    time: string,
}

function buildMsg(name: string, text: string): Message {
    return {
        name,
        text,
        time: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    }
}

export { buildMsg };