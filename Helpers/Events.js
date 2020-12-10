const Client = require('../Client');
const { EventEmitter } = require('events');
const { User } = require('../Models');

class Events {
    Client;
    EE;

    /**
     * 
     * @param {Client} client 
     */
    constructor(client) {
        this.Client = client;
        this.EE = new EventEmitter();
        this.EE.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }

    /**
     * @param {() => void} fn
     */
    set Connected(fn) { this.Client.Socket.IO.on('connect', fn); }

    /**
    * @param {() => void} fn
    */
    set Disconnected(fn) { this.Client.Socket.IO.on('disconnect', fn); }

    /**
     * @param {() => void} fn
     */
    set Reconnected(fn) { this.Client.Socket.IO.on('reconnect', fn); }

    /**
     * @param {(user: User) => void} fn
     */
    set LoginSuccess(fn) { this.EE.on('security login success', fn); }

    /**
     * @param {() => void} fn
     */
    set LoginFailed(fn) { this.EE.on('security login failed', fn); }

    /**
     * @param {() => void} fn
     */
    set LogoutSuccess(fn) { this.EE.on('security logout success', fn); }

    /**
     * @param {() => void} fn
     */
    set LogoutFailed(fn) { this.EE.on('security logout failed', fn); }
}

module.exports = {
    Events
}