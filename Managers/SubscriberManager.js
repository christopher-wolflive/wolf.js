const Client = require('../Client');
const Requests = require('../Network/IO/Requests');

module.exports = class SubscriberManager {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * @type {any[]}
     */
    #Cache = null;

    /**
     * Create a new Subscriber Manager
     * @param {Client} client 
     */
    constructor(client, cacheSubscribers = false) {
        this.#Client = client;
        
        if (cacheSubscribers)
            this.#Cache = [];
    }
    

    /**
     * 
     * @param {number} id the id of the subscriber
     * @param {boolean} extended fetch the extended portion of the subscriber profile, if not cached
     * @param {boolean} subscribe subscribe to updates to this subscriber's profile
     */
    GetSubscriber = async (id, extended = true, subscribe = true) => {
        let subscriber = this.#Cache?.find(sub => sub.Id === id);

        if (subscriber)
            return subscriber;
        
        try {
            subscriber = await Requests.SubscriberProfile(this.#Client.V3, id, extended, subscribe);

            console.log(subscriber);
            return subscriber;
        } catch (e) { return null; }
    }
}