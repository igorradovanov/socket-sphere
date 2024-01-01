"use strict";
//Helper message functions
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMsg = void 0;
function buildMsg(name, text) {
    return {
        name: name,
        text: text,
        time: new Date().toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
    };
}
exports.buildMsg = buildMsg;
