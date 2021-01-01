const IO = require('../IO');

module.exports = class SubscriberRequests {
    /**
     * Request a Subscriber's Profile
     * @param {IO} io the socket.io clien to route this through
     * @param {number} id the id of the subscriber
     * @param {boolean} extended fetch the extended portion of the subscriber's profile
     * @param {booleam} subscribe subscribe to changes to this subscriber's profile
     */
    static SubscriberProfile = async (io, id, extended = true, subscribe = true) => await io.Emit('subscriber profile', {
        headers: { version: 4 },
        body: {
            id,
            extended,
            subscribe
        }
    });
}