const { assign } = require('./util');
const Client = require('../Client');
const Requests = require('../Network/IO/Requests');
const Subscriber = require('../Models/Subscriber/Subscriber');

module.exports = class SubscriberManager {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * Create a new Subscriber Manager
     * @param {Client} client 
     */
    constructor(client) {
        this.#Client = client;
    }
    

    /**
     * Get a Subscriber by their ID
     * @param {number} id the id of the subscriber
     * @param {boolean} extended fetch the extended portion of the subscriber profile
     * @param {boolean} subscribe subscribe to updates to this subscriber's profile
     * @returns {Subscriber}
     */
    GetSubscriber = async (id, extended = false, subscribe = false) => {
        try {
            let response = await Requests.SubscriberProfile(this.#Client.V3, id, extended, subscribe);

            return assign(new Subscriber(), response.body);
        } catch { return null }
    }

    /**
    * Get Subscribers by their IDs
    * @param {number[]} idList the id of the subscriber
    * @param {boolean} extended fetch the extended portion of the subscriber profile
    * @param {boolean} subscribe subscribe to updates to this subscriber's profile
    * @returns {Subscriber[]}
    */
    GetSubscribers = async (idList, extended = false, subscribe = false) => {
        try {
            let response = await Requests.SubscriberProfiles(this.#Client.V3, idList, extended, subscribe);

            return response.map(t => assign(new Subscriber(), t));
        } catch { return []; }
    }
}