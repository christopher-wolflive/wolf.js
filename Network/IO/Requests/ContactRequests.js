const IO = require('../IO');

module.exports = class ContactRequests {
    /**
     * Get the contact list of the current subscriber
     * @param {IO} io the socket.io client to send this request through 
     * @param {boolean} subscribe subscribe to updates to the block list
     */
    static SubsscriberContactList = async (io, subscribe = false) => await io.Emit('subscriber contact list', { subscribe });

    /**
     * Add the subscriber as a contact
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} id the id of the subscriber 
     */
    static SubscriberContactAdd = async (io, id) => await io.Emit('subscriber contact add', { id });

    /**
     * Delete the subscriber as a contact
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} id the id of the subscriber 
     */
    static SubscriberContactDelete = async (io, id) => await io.Emit('subscriber contact delete', { id }); 
}