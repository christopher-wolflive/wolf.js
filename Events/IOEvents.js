const Client = require('../Client');

module.exports = class IOEvents {
    /**
     * Client
     * @type {Client}
     */
    Client;

    constructor(client) {
        this.Client = client;
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
     * Call a function when a Ping is sent from WOLF
     * @param {() => void} fn
     */
    set Ping(fn) { this.Client.Socket.On('ping', fn); };

    /**
     * Call a function when a Pong is recieved back from WOLF
     * @param {(latency: number) => void} fn
     */
    set Pong(fn) { this.Client.Socket.On('pong', fn); };
}