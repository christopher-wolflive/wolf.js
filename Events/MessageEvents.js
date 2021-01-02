const Client = require('../Client');
const { EventEmitter } = require('events');
const Message = require('../Models/Message/Message');
const { assign } = require('../Managers/util');

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

        this.#Client.V3.Conn.on('message send', this.#OnMessageSend);
    }

    /**
     * Raise an event when a message is received
     * @param {(message: Message) => void} fn
     */
    set Received(fn) { this.#Emitter.on('message received', fn); };

    /**
     * Raise an event when a message is sent 
     * @param {(message: Message) => void} fn
     */
    set Sent(fn) { this.#Emitter.on('message send', fn); };

    /**
     * Emit the Message Recieved event
     * @returns {(message: Message) => boolean}
     */
    get Received() { return (message) => this.#Emitter.emit('message received', message); }

    /**
     * Emit the Message Send event
     * @returns {(message: Message) => boolean}
     */
    get Sent() { return (message) => this.#Emitter.emit('message send', message); };

    #OnMessageSend = async (data) => {
        let mesg = data.body;

        // Wrap Recipient and Originator in generic simple object style if private
        if (!mesg.recipient?.id) mesg.recipient = { id: mesg.recipient, hash: null };
        if (!mesg.originator?.id) mesg.originator = { id: mesg.originator, hash: null };
        mesg.content = mesg.data.toString('utf-8');

        mesg = assign(new Message, mesg);

        this.Received(mesg);
    }
}