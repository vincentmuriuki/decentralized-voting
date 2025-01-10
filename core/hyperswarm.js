import Hyperswarm from "hyperswarm";
import crypto from 'hypercore-crypto'
import b4a from 'b4a'

export function initializeSwarm(topic) {
    const swarm = new Hyperswarm();
    const topicKey = crypto.data(b4a.from(topic, 'hex'));

    swarm.join(topicKey, {
        client: true,
        server: true
    })

    return swarm;

}