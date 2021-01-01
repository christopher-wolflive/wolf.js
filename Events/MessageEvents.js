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
}