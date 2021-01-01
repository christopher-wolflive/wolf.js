const Client = require('../Client');
const { EventEmitter } = require('events');
const Subscriber = require('../Models/Subscriber/Subscriber');
const { kMaxLength } = require('buffer');

module.exports = class Events {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * @type {EventEmitter}
     */
    #Emitter;

    /**
     * Create new Events Handler
     * @param {Client} client 
     * @param {EventEmitter} emitter 
     */
    constructor(client, emitter) {
        this.#Client = client;
        this.#Emitter = emitter;

        this.#Client.V3.Conn.on('subscriber update', this.#OnUpdate);
    }

    /**
     * Raise an event when a subscriber is fetched
     * @param {(subscriber: Subscriber) => void} fn
     */
    set Fetched(fn) { this.#Emitter.on('subscriber profile', fn); };

    /**
     * Raise an event when a subscriber's profile has updated
     * @param {(subscriberId: number) => void} fn
     */
    set Updated(fn) { this.#Emitter.on('subscriber update', fn); };

    /**
     * Emit the Subscriber Profile Fetched Event
     * @returns {(subscriber: Subscriber) => boolean}
     */
    get Fetched() { return (subscriber) => this.#Emitter.emit('subscriber profile', fn); };

    /**
     * Emit the Subscriber Profile Updates Event
     * @returns {(subscriberId: number) => boolean}
     */
    get Updated() { return (subscriberId) => this.#Emitter.emit('subscriber update', subscriberId); };

    #OnUpdate = (data) => {
        let { id } = data.body;

        if (this.#Client.CurrentUser.Id === id)
            this.#Client.CurrentUser = await this.#Client.Subscribers.GetSubscriber(id);

        this.Updated(id);
    }
}