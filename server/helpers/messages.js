//Helper message functions

function buildMsg(name, text) {
    return {
        name,
        text,
        time: Date.now()
    }
}

export { buildMsg };