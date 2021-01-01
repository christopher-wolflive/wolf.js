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
     * 
     * @param {number} id the id of the subscriber
     * @param {boolean} extended fetch the extended portion of the subscriber profile
     * @param {boolean} subscribe subscribe to updates to this subscriber's profile
     */
    GetSubscriber = async (id, extended = false, subscribe = false) => {
        try {
            let response = await Requests.SubscriberProfile(this.#Client.V3, id, extended, subscribe);

            let subscriber = assign(new Subscriber(), response.body);

            console.log(subscriber);

            return response;
        } catch (e) { console.log(e); return null }
    }
}