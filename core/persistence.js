import path from 'bare-path'

export function getStoragePath() {
    return path.join(Pear.config.storage || './voting-data', `session-${Date.now()}`)
}