import crypto from 'hypercore-crypto'

export function signVote(vote){
    return crypto.sign(vote)
}

export function verifyVote(signature, publicKey, vote) {
    return crypto.verify(vote, signature, publicKey)
}