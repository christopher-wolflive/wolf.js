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

    /**
     * Request Multiple Subscriber's IDs
     * @param {IO} io the socket.io client to route this through
     * @param {number[]} idList the list of ids to fetch
     * @param {boolean} extended fetch the extended portion of the profiles
     * @param {boolean} subscribe subscribe to updates to these user's profiles
     */
    static SubscriberProfiles = async (io, idList, extended = false, subscribe = false) => await io.Emit('subscriber profile', {
        headers: { version: 4 },
        body: {
            idList,
            extended,
            subscribe
        }
    }, 50);

    /**
     * Request and Update to the Client's currently logged in subscriber's profile
     * @param {IO} io the socket.io client to route this through
     * @param {{nickname?: string, status?: string, extended?: { name?: string, about?: string, gender?: number, lookingFor?: number, relationship?: number, langugae?: number, urls?: string[], dateOfBirth?: number}}} data the update data
     */
    static SubscriberProfileUpdate = async (io, data) => await io.Emit('subscriber profile update', data);

    /**
     * Request the list of groups for the current subscribers
     * @param {IO} io the socket.io client to route this through
     * @param {boolean} subscribe subscribe to changes to the subscriber's group list
     */
    static SubscriberGroupList = async (io, subscribe = false) => await io.Emit('subscriber group list', { subscribe }); 

    /**
     * Get the current subsctiber's settings
     * @param {IO} io the socket.io client to route this through
     */
    static SubscriberSettings = async (io) => await io.Emit('subscriber settings', {});

    /**
     * Update the current subscriber's settings
     * @param {IO} io the socket.io client to route this through
     * @param {number} state the new state
     */
    static SubscriberSettingsUpdate = async (io, state) => await io.Emit('subscriber settings update', { state: { state } });

    /**
     * Get the presence of a subscriber
     * @param {IO} io the socket.io client to route this through
     * @param {number} id the id of the subscriber
     */
    static SubscriberPresence = async (io, id) => await io.EMit('subscriber presence', { id });

    /**
     * The the presence of multiple subscribers
     * @param {IO} io the socket.io client to route this through
     * @param {number} idList the ids of the subscribers
     */
    static SubscriberPresences = async (io, idList) => await io.Emit('subscriber presence', { idList });
}