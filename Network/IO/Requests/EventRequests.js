const IO = require('../IO');

module.exports = class EventRequests {

    /**
     * Get a list of events the current subscriber is subscribed to
     * @param {IO} io the socket.io client to send this request through
     * @param {boolean} subscribe 
     */
    static SubscriberGroupEventList = async (io, subscribe = false) => await io.Emit('subscriber group event list', { subscribe });
    
    /**
     * Add an event to the current subscriber's list
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the event
     */
    static SubscriberGroupEventAdd = async (io, id) => await io.Emit('subscriber group event add', { id });
    
    /**
     * Remove an event from the current subscriber's list
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the event
     */
    static SubscriberGroupEventDelete = async (io, id) => await io.Emit('subscriber group event delete', { id });
    
    /**
     * Get details about an event
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the event
     */
    static GroupEvent = async (io, id) => await io.Emit('group event', { id });
    
    /**
     * Get detaild about multiple events
     * @param {IO} io the socket.io client to send this request through
     * @param {number[]} idList the ids of the events
     */
    static GroupEvents = async (io, idList) => await io.Emit('group event', { idList });
    
    /**
     * Get events that are being hosted by a group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     * @param {boolean} subscribe subscribe to changes to this list
     */
    static GroupEventList = async (io, id, subscribe = false) => await io.Emit('group event list', { id, subscribe });
    
    /**
     * Create an event
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the id of the group
     * @param {any} data the data to create the event with
     */
    static GroupEventCreate = async (io, groupId, data) => await io.Emit('group event create', { groupId, ...data });
    
    /**
     * Update an event
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the event
     * @param {any} data the data to update the event with
     */
    static GroupEventUpdate = async (io, id, data) => await io.Emit('group event update', { id, ...data });
}