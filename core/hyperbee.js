import Hyperbee from "hyperbee";

export function initializeHyperbee(feed) {
    return new Hyperbee(feed, {
        keyEncoding: 'utf-8',
        valueEncoding: 'json'
    })
}