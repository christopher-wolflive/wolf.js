const IO = require('../IO');

module.exports = class BlockedRequests {

    /**
     * Get the block list of the current subscriber
     * @param {IO} io the socket.io client to send this request through 
     * @param {boolean} subscribe subscribe to updates to the block list
     */
    static SubscriberBlockList = async (io, subscribe = false) => await io.Emit('subscriber block list', { subscribe });

    /**
     * Block a subscriber
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} id the id of the subscriber 
     */
    static SubscriberBlockAdd = async (io, id) => await io.Emit('subscriber block add', { id });

    /**
     * Unblock a subscriber
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} id the id of the subscriber 
     */
    static SubscriberBlockDelete = async (io, id) => await io.Emit('subscriber block delete', { id }); 
}