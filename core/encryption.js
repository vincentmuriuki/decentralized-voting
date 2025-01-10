import crypto from 'bare-crypto'
import b4a from 'b4a'

export function encryptData(secretKey, data) {
    const key = b4a.from(secretKey, 'utf-8'); // Convert the key to a buffer
    if (key.length !== 32) throw new Error('Secret key must be 32 bytes long.');

    const nonce = crypto.randomBytes(12); // Generate a 12-byte nonce
    const plaintext = b4a.from(JSON.stringify(data), 'utf-8');

    const ciphertext = crypto.aead.encrypt(plaintext, nonce, key);

    // Combine nonce and ciphertext for transmission
    return b4a.toString(Buffer.concat([nonce, ciphertext]), 'base64');
}

export function decryptData(encryptedData, secretKey) {
    const key = b4a.from(secretKey, 'utf-8')
    const decrypted = crypto.decrypt(key, encryptedData)
    return JSON.parse(b4a.toString(decrypted))
}