const Client = require('../Client');
const { EventEmitter } = require('events');
const Message = require('../Models/Message/Message');

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
     * Raise an event when a message is sent 
     * @param {(message: Message) => void} fn
     */
    set Sent(fn) { this.#Emitter.on('message send', fn); };

    /**
     * Emit the Message Send event
     * @returns {(message: Message) => boolean}
     */
    get Sent() { return (message) => this.#Emitter.emit('message send', message); };
}