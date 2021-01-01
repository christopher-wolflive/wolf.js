const Client = require('../Client');
const { EventEmitter } = require('events');

module.exports = class IOEvents {
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
     * Raise an Event when Connected to WOLF
     * @param {() => void} fn
     */
    set V3Connected(fn) { this.#Client.V3.Conn.on('connect', fn); };

    /**
     * Raise an Event when Connected to WOLF
     * @param {(reason: string) => void} fn
     */
    set V3Disconnected(fn) { this.#Client.V3.Conn.on('disconnect', fn); };

    /**
     * Raise an Event when Connected to WOLF
     * @param {(attempt: number) => void} fn
     */
    set V3Reconnected(fn) { this.#Client.V3.Conn.on('reconnect', fn); };
}