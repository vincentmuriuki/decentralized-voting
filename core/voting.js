import { logAuditEvent } from "./audit";
import { encryptData } from "./encryption";
import crypto from 'hypercore-crypto';

// const key = 'e38a9e59326c193df2657c4a4bb69bd83aba5823d77faf23fb85394135defc7f';
const key = crypto.randomBytes(32);

export async function castVote(db, voterId, candidate) {
    const timestamp = Date.now();
    const voteKey = `vote-${voterId}-${timestamp}`;

    

    const encrypted = encryptData(key, {
        voterId,
        candidate,
        timestamp
    });

    await db.put(key, encrypted);

    await logAuditEvent('VoteCast', { voteId: vote.id, userId: vote.userId }, db);

    console.log(`Vote cast by ${voterId} for ${candidate}`);
}

export async function tallyVotes(db) {
    const result = {}

    for await (const { value } of db.createReadStream()) {
        const { candidate } = value;
        result[candidate] = (result[candidate] || 0) + 1;
    }
    return result
}