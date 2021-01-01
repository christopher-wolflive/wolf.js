const Client = require('../Client');
const { EventEmitter } = require('events');

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
    }

    /**
     * Rasie an event when the SDK is ready
     * @param {() => void} fn
     */
    set Ready(fn) { this.#Emitter.on('sdk ready', fn); };

    /**
     * Emit the SDK Ready Event
     */
    get Ready() { return () => this.#Emitter.emit('sdk ready'); };
}