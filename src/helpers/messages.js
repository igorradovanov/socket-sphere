//Helper message functions

function buildMsg(name, text) {
    return {
        name,
        text,
        time: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    }
}

export { buildMsg };