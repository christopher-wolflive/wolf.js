const Client = require('../Client');
const { EventEmitter } = require('events');
const Subscriber = require('../Models/Subscriber/Subscriber');

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
     * Raise an event when login to wolf failed
     * @param {(subcode: number)} fn
     */
    set LoginFailed(fn) { this.#Emitter.on('security login failed', fn); };
    
    /**
     * Raise an event when logged in successfully
     * @param {(subscriber: Subscriber) => void} fn
     */
    set LoginSuccess(fn) { this.#Emitter.on('security login success', fn); };

    /**
     * Raise an event when the Cognito Token is refreshed
     * @param {(cognito: { identity: string, token: string}) => void} fn
     */
    set TokenRefreshed(fn) { this.#Emitter.on('security token refreshed', fn); };
    
    /**
     * Emit the Security Login Failed Event
     * @returns {(subcode: number) => boolean}
     */
    get LoginFailed() { return (subcode) => this.#Emitter.emit('security login failed', subcode); };
    
    /**
     * Emit the Secuirty Login Success Event
     * @returns {(subscriber: Subscriber) => boolean}
     */
    get LoginSuccess() { return (subscriber) => this.#Emitter.emit('security login success', subscriber); };

    /**
     * Emit the Security Token Refreshed Event
     * @returns {(cognito: { identity: string, token: string}) => boolean}
     */
    get TokenRefreshed() { return (cognito) => this.#Emitter.emit('security token refreshed', cognito); };
}