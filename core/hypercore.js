import Hypercore from 'hypercore'

export function initializeHypercore(storagePath) {
    return new Hypercore(storagePath, { valueEncoding: 'json' })
}