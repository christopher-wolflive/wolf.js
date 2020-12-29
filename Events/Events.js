const Client = require('../Client');
const { EventEmitter } = require('events');
const IOEvents = require('./IOEvents');
const { Subscriber } = require('../Models/Subscriber');
const { SubscriberRequests } = require('../Network/Requests');

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
     * Call a function when Login to WOLF failed
     * @param {(reason: number) => void} fn
     */
    set LoginFailed(fn) { this.Emitter.on('security login failed', fn); };

    /**
     * Emit the Login Failed Function
     * @returns {(reason: number) => boolean}
     */
    get LoginFailed() { return (reason) => this.Emitter.emit('security login failed', reason); };

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
     * Call a function when a subscriber has updated their profile
     * @param {(old: Subscriber, current: Subscriber) => void} fn
     */
    set SubscriberUpdated(fn) { this.Emitter.on('subscriber update', fn); };

    /**
     * Emit the Subscriber Updated Function
     * @param {(old: Subscriber, current: Subscriber) => void} fn
     */
    get SubscriberUpdated() { return (old, current) => this.Emitter.emit('subscriber update', old, current); };

    /**
     * Bind Event Handlers to the Client
     * @param {Client} client 
     */
    BindEvents = (client) => {
        client.Socket.On('subscriber update', OnSubscriberUpdate(client));
        client.Socket.On('welcome', OnWelcome(client));
    }
}

/**
 * @param {Client} client
 */
OnSubscriberUpdate = client => async data => {
    if (data.code !== 200)
        return;
    
    // Get Index of Subscriber in Cache
    let index = client.Subscribers.Cache.findIndex(t => t.Id === data.body.id);

    let old = client.Subscribers.Cache[index] ?? null;

    // Fetch the updated subscriber
    let current = await SubscriberRequests.Get(client.Socket, data.body.id);

    if (current.code !== 200)
        return;
    
    current = new Subscriber(current.body);
 
    if (index < 0) client.Subscribers.Cache.push(current);
    else client.Subscribers.Cache[index] = current;

    client.On.SubscriberUpdated(old, current);
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