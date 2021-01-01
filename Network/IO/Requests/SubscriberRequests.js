const IO = require('../IO');

module.exports = class SubscriberRequests {
    /**
     * Request a Subscriber's Profile
     * @param {IO} io the socket.io clien to route this through
     * @param {number} id the id of the subscriber
     * @param {boolean} extended fetch the extended portion of the subscriber's profile
     * @param {booleam} subscribe subscribe to changes to this subscriber's profile
     */
    static SubscriberProfile = async (io, id, extended = false, subscribe = false) => await io.Emit('subscriber profile', {
        headers: { version: 4 },
        body: {
            id,
            extended,
            subscribe
        }
    });

    static SubscriberProfiles = async (io, idList, extended = false, subscribe = false) => await io.Emit('subscriber profile', {
        headers: { version: 4 },
        body: {
            idList,
            extended,
            subscribe
        }
    }, 50);
}