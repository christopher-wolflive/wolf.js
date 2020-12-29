const Socket = require('../Socket');

/**
 * Singleton Packet Templates relating to Subscriber Requests
 */
module.exports = class SubscriberRequests {
    
    /**
     * Get a Subscriber by their ID
     * @param {Socket} socket the socket to send this request through
     * @param {number} id The id of the Subscriber to fetch
     * @param {boolean} extended Fetch the extended profile of the Subscriber, defaults to true
     * @param {boolean} subscribe Subscribe to Subscriber Profile Updates, defaults to true
     */
    static Get = async (socket, id, extended = true, subscribe = true) => await socket.Emit('subscriber profile', {
        headers: { version: 4 },
        body: { id, extended, subscribe }
    });

    /**
     * Get multiple Subscribers by their ID
     * @param {Socket} socket the socket to send this request through
     * @param {number[]} idList the ids of the Subscribers to fetch
     * @param {boolean} extended Fetch the extended profiles of the Subscribers, defaults to true
     * @param {boolean} subscribe Subscribe to Subsciber Profile Updates for the Subscribers, defaults to true
     */
    static GetMultiple = async (socket, idList, extended = true, subscribe = true) => await socket.Emit('subscriber profile', {
        headers: { version: 4 },
        body: { idList, extended, subscribe }
    }, 50);
}