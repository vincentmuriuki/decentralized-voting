/** @typedef {import('pear-interface')} */ /* global Pear */

import { initializeHyperbee } from './core/hyperbee';
import { initializeHypercore } from './core/hypercore';
import { initializeSwarm } from './core/hyperswarm';
import b4a from 'b4a';
import { getStoragePath } from './core/persistence';
import { castVote, tallyVotes } from './core/voting';

const storagePath = getStoragePath();
const feed = initializeHypercore(storagePath);
const db = initializeHyperbee(feed);

await db.ready();

const swarm = initializeSwarm('voting-system');
const peerId = b4a.toString(feed.key, 'hex')

swarm.on('connection', connection => {
    console.log(`Peer connected: ${b4a.toString(connection.remotePublicKey, 'hex')}`);
    feed.replicate(connection)
});

await castVote(db, peerId, 'Trump');
const results = await tallyVotes(db);
console.log('Curent votes tally:', results);