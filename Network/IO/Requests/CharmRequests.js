const IO = require('../IO');

module.exports = class CharmRequests {

    /**
     * Request Information about a Charm
     * @param {IO} io the socket.io client to send the request through 
     * @param {number} id the id of the charm
     */
    static Charm = async (io, id) => io.Emit('charm list', { id });
    
    /**
     * Request Information about Charms
     * @param {IO} io the socket.io client to send the request through 
     * @param {number[]} idList the ids of the charms
     */
    static CharmList = async (io, idList = null) => io.Emit('charm list', { idList });
    
    /**
     * Request a list of Starred Charms
     * @param {IO} io the socket.io client to send the request through 
     */
    static CharmStarredList = async (io) => io.Emit('charm starred list', {});
    
    /**
     * Return the active charms for a subscriber
     * @param {IO} io the socket.io client to send the request through 
     * @param {number} id the id of the subscriber
     */
    static CharmSubscriberActiveList = async (io, id) => io.Emit('charm subscriber active list', { id });
    
    /**
     * Returns the expired charms for a subscriber
     * @param {IO} io the socket.io client to send the request through 
     * @param {*} id the id of the subscriber
     */
    static CharmSubscriberExpiredList = async (io, id) => io.Emit('charm subscriber expired list', { id });
    
    /**
     * Deletes Charm Records
     * @param {IO} io the socket.io client to send the request through 
     * @param {number[]} idList the ids of the charms to delete
     */
    static CharmSubscriberDelete = async (io, idList) => io.Emit('charm subscriber delete', { idList });
    
    /**
     * Returns a list of active charms for a set of subscribers
     * @param {IO} io the socket.io client to send the request through 
     * @param {number[]} idList the ids of the subscribers
     */
    static CharmSubscriberSelectedList = async (io, idList) => io.Emit('charm subscriber selected list', { idList });
    
    /**
     * Set a list of charms for the user to display
     * @param {IO} io the socket.io client to send the request through 
     * @param {{ activeCharmId: string, charmId: string, position: number }[]} selectedCharms 
     */
    static CharmSubscriberSetSelected = async (io, selectedCharms) => io.Emit('charm subscriber set selected', { selectedCharms });
    
    /**
     * Get a summary list of charms for a subscriber
     * @param {IO} io the socket.io client to send the request through 
     * @param {*} id the id of the subscriber
     */
    static CharmSubscriberSummaryList = async (io, id) => io.Emit('charm subscriber summary list', { id });
    
    /**
     * Get stats for a subscriber's charms
     * @param {IO} io the socket.io client to send the request through 
     * @param {*} id the id of the subcriber
     * @param {*} extended will include further stats such as most gifted charm
     */
    static CharmSubscriberStatistics = async (io, id, extended = false) => io.Emit('charm subscriber staticstics', { id, extended });
}