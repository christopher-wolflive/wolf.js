const { assign } = require('../Managers/util');
const Client = require('../Client');
const { EventEmitter } = require('events');
const Requests = require('../Network/IO/Requests');
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

        this.#Client.V3.Conn.on('welcome', this.#OnWelcome);
    }

    /**
     * Raise an event when the welcome packet is recieved
     * @param {(data: any) => void} fn
     */
    set Welcome(fn) { this.#Client.V3.Conn.on('welcome', fn); };

    #OnWelcome = async (data) => {
        let { endpointConfig, loggedInUser } = data;

        if (loggedInUser) {
            try {
                // Request Cognito Information for MMS through AWS
                let cognito = await Requests.SecurityTokenRefresh(this.#Client.V3);
                this.#Client.On.Security.TokenRefreshed(cognito);

                subscriber = assign(new Subscriber(), loggedInUser);
                
                this.#Client.On.Security.LoginSuccess(subscriber);
            } catch (e) { console.log(e); }
        }
    }
}