const Client = require('../Client');
const { EventEmitter } = require('events');
const Message = require('../Models/Message/Message');
const User = require('../Models/User/User');

module.exports = class Events {
    #Client;
    #EE;

    /**
     * @param {Client} client 
     */
    constructor(client) {
        this.#Client = client;
        this.#EE = new EventEmitter();
        this.#EE.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }

    /**
     * Raise an even when a welcome packet is recieved
     * @param {(welcomeData: any) => void} fn
     */
    set Welcome(fn) { this.#Client.Socket.On('welcome', fn); }

    /**
     * Raise an event when connected
     * @param {() => void} fn
     */
    set Connected(fn) { this.#Client.Socket.On('connect', fn); }

    /**
     * Raise an event when disconnected
     * @param {() => void} fn
     */
    set Disconnected(fn) { this.#Client.Socket.On('disconnect', fn); }

    /**
     * Raise an event when reconnected
     * @param {() => void} fn
     */
    set Reconnected(fn) { this.#Client.Socket.On('reconnect', fn); }

    /**
     * Raise an event when logged in successfully
     * @param {(user: User) => void} fn
     */
    set LoginSuccess(fn) { this.#EE.on('security login success', fn); }

    /**
    * Raise an event when login failed
    * @param {() => void} fn
    */
    set LoginFailed(fn) { this.#EE.on('security login failed', fn); }

    /**
     * @param {(message: Message) => void} fn
     */
    set MessageRecieved(fn) { this.#EE.on('message send', fn); }

    /**
     * @param {() => void} fn
     */
    set Ready(fn) { this.#EE.on('ready', fn); }

    /**
     * 
     * @param {string | number} type 
     * @param  {...any} args 
     */
    Emit = (type, ...args) => this.#EE.emit(type, ...args);
}



// const Client = require('../Client');
// const { EventEmitter } = require('events');
// const Message = require('../Models/Message');
// const User = require('../Models/User');
// const FailedCommand = require('../Models/FailedCommand');

// module.exports = class Events {
//     Client;
//     EE;

//     /**
//      * 
//      * @param {Client} client 
//      */
//     constructor(client) {
//         this.Client = client;
//         this.EE = new EventEmitter();
//         this.EE.setMaxListeners(Number.MAX_SAFE_INTEGER);
//     }

//     /**
//      * @param {() => void} fn
//      */
//     set Connected(fn) { this.Client.Socket.IO.on('connect', fn); }

//     /**
//     * @param {() => void} fn
//     */
//     set Disconnected(fn) { this.Client.Socket.IO.on('disconnect', fn); }

//     /**
//      * @param {() => void} fn
//      */
//     set Reconnected(fn) { this.Client.Socket.IO.on('reconnect', fn); }

//     /**
//      * @param {(user: User) => void} fn
//      */
//     set LoginSuccess(fn) { this.EE.on('security login success', fn); }

//     /**
//      * @param {() => void} fn
//      */
//     set LoginFailed(fn) { this.EE.on('security login failed', fn); }

//     /**
//      * @param {() => void} fn
//      */
//     set LogoutSuccess(fn) { this.EE.on('security logout success', fn); }

//     /**
//      * @param {() => void} fn
//      */
//     set LogoutFailed(fn) { this.EE.on('security logout failed', fn); }

//     /**
//      * @param {(message: Message) => void} fn
//      */
//     set MessageRecieved(fn) { this.EE.on('message send', fn); }

//     /**
//      * @param {(update: GroupMemberUpdate) => void} fn
//      */
//     set GroupAction(fn) { this.EE.on('group action', fn); }

//     /**
//      * @param {(report: FailedCommand) => void} fn
//      */
//     set FailedCommand(fn) { this.EE.on('failed command', fn); }
// }