const Client = require('../Client');
const { EventEmitter } = require('events');
const Group = require('../Models/Group/Group');

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
        
        this.#Client.V3.Conn.on('group update', this.#OnUpdate);
    }

    /**
     * Raise an event when a group is fetched
     * @param {(group: Group) => void} fn
     */
    set Fetched(fn) { this.#Emitter.on('group profile', fn); };

    /**
     * Raise an event when a group is updated
     * @param {(groupId: number) => void} fn
     */
    set Updated(fn) { this.#Emitter.on('group update', fn); };

    /**
     * Emit the Group Fetched Event
     * @returns {(group: Group) => boolean}}
     */
    get Fetched() { return (group) => this.#Emitter.emit('group profile', group); };

    /**
     * Emit the Group Updated Event
     * @returns {(groupId: number) => booleam}
     */
    get Updated() { return (groupId) => this.#Emitter.emit('group update', groupId); };

    #OnUpdate = async (data) => {
        let { id } = data.body;

        this.Updated(id);
    }
}