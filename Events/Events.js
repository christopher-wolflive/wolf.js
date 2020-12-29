const Client = require('../Client');
const { EventEmitter } = require('events');
const IOEvents = require('./IOEvents');
const { Subscriber } = require('../Models/Subscriber');

module.exports = class Events {
    /**
     * Client
     * @type {Client}
     */
    Client;

    /**
     * Emitter
     * @type {EventEmitter}
     */
    Emitter;

    /**
     * SocketIO Related Events
     * @type {IOEvents}
     */
    IO;

    constructor(client) {
        this.Client = client;
        this.Emitter = new EventEmitter();

        this.Emitter.setMaxListeners(Number.MAX_SAFE_INTEGER);

        this.IO = new IOEvents(client);
    }

    /**
     * Call a function when connected to WOLF
     * @param {() => void} fn
     */
    set Connected(fn) { this.Client.Socket.On('connect', fn); };

    /**
     * Call a function when connected to WOLF
     * @param {() => void} fn
     */
    set Disconnected(fn) { this.Client.Socket.On('disconnect', fn); };

    /**
     * Call a fucntion when Login to WOLF was successful
     * @param {(subscriber: Subscriber) => void} fn
     */
    set LoginSuccess(fn) { this.Emitter.on('security login success', fn); };

    /**
     * Emit the Login Success Function
     * @returns {(subscriber: Subscriber) => boolean}
     */
    get LoginSuccess() { return (subscriber) => this.Emitter.emit('security login success', subscriber); };

    /**
     * Bind Event Handlers to the Client
     * @param {Client} client 
     */
    BindEvents = (client) => {
        client.Socket.On('welcome', OnWelcome(client));
    }
}

/**
 * @param {Client} client
 */
OnWelcome = client => async data => {
    if (data.loggedInUser) {
        client.AuthUser = await client.Subscribers.Get(data.loggedInUser.id);
        client.On.LoginSuccess(client.AuthUser);
    }
}