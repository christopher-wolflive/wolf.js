const Client = require('../Client');
const { Subscriber } = require('../Models/Subscriber');
const { SubscriberRequests } = require('../Network/Requests');

/**
 * Subscriber Cache Manager (shared caching)
 */
module.exports = class SubscriberManager {
    /**
     * The static cache to be shared across all clients
     * @type {Subscriber[]}
     */
    static Cache = [];

    /**
     * The Client to send requests through
     * @type {Client}
     */
    Client;

    /**
     * Create a new Subscriber Manager wrapped around a client
     * @param {Client} client the client to use for requests
     */
    constructor(client) {
        this.Client = client;
    }

    /**
     * Get a Subscriber by their ID
     * @param {number} id the id of the subscriber
     * @param {boolean} extended get the extended portion of the subscriber, defaults to true
     * @param {subscribe} subscribe subscribet to profile updates for the subscriber, defaults to true
     * @returns {Subscriber}
     */
    Get = async (id, extended = true, subscribe = true) => {
        // If Cache is undefined, define it
        if (!this.Cache)
            this.Cache = [];
        
        // Fetch Subscriber from Cache
        let subscriber = this.Cache.find(sub => sub.Id === id)

        if (subscriber)
            return subscriber;
        
        subscriber = await SubscriberRequests.Get(this.Client.Socket, id, extended, subscribe);

        if (subscriber.code !== 200)
            return null;

        subscriber = new Subscriber(subscriber.body);

        this.Cache.push(subscriber);
        return subscriber;
    }

    /**
     * Get multiple Subscribers by their ID
     * @param {number[]} idList the ids of the Subscribers to fetch
     * @param {boolean} extended Fetch the extended profiles of the Subscribers, defaults to true
     * @param {boolean} subscribe Subscribe to Subsciber Profile Updates for the Subscribers, defaults to true
     * @returns {Subscriber[]}
     */
    GetMultiple = async (idList, extended = true, subscribe = true) => {
        // If Cache is Undefined, define it
        if (!this.Cache)
            this.Cache = [];
        
        // Get Cached Subscibers
        let subscribers = this.Cache.filter(sub => idList.includes(sub.Id));

        // Filter out cached subscriber ids
        idList = idList.filter(id => !subscribers.some(sub => sub.Id === id));

        // Request the missing subscribers
        let fetched = Object.values(await SubscriberRequests.GetMultiple(this.Client.Socket, idList, extended, subscribe)).filter(t => t.code === 200).map(t => new Subscriber(t.body));

        // Add fetched to cache
        this.Cache.push(...fetched);

        // Add fetched to subscribers array
        subscribers.push(...fetched);

        return subscribers;
    }
}