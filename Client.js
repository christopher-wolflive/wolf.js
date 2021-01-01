const Events = require('./Events');
const { EventEmitter } = require('events');
const IO = require('./Network/IO/IO');
let Requests = require('./Network/IO/Requests');
let SubscriberManager = require('./Managers/SubscriberManager');
const Subscriber = require('./Models/Subscriber/Subscriber');
const { assign } = require('./Managers/util');

module.exports = class Client {
    /**
     * @type {string}
     */
    Token;

    /**
     * @type {Subscriber}
     */
    CurrentUser;

    /**
     * @type {IO}
     */
    V3;

    /**
     * Internal Event Emitter
     * @type {EventEmitter}
     */
    Emitter;

    /**
     * @type {Events}
     */
    On;

    /**
     * @type {SubscriberManager}
     */
    Subscribers;

    constructor(token = null) {
        this.Token = token ?? this.#GenerateToken();
        this.V3 = new IO(this);
        this.Emitter = new EventEmitter();
        this.Emitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
        this.On = new Events(this, this.Emitter);

        this.Subscribers = new SubscriberManager(this);
    }

    /**
     * Login to WOLF with the given Credentials
     * @param {string} email the email of the account
     * @param {string} password the password of the account
     * @param {number} onlineState the onlineState to use
     */
    Login = async (email, password, onlineState = 1) => {
        try {
            let resp = await Requests.SecurityLogin(this.V3, email, password, onlineState);
        
            let { code, headers, body } = resp;
            
            if (code !== 200) {
                const { subcode } = headers;
                this.On.Security.LoginFailed(subcode);
                return false;
            }
            
            let { cognito, subscriber } = body;

            subscriber = assign(new Subscriber(), subscriber);

            this.On.Security.LoginSuccess(subscriber);
            return true;
        } catch { return false; };
    }

    /**
     * Logout from WOLF
     */
    Logout = async () => {
        try {
            let resp = await Requests.SecurityLogout(this.V3);

            console.log(resp);
        } catch (e) { console.log(e) };
    }

    /**
     * Generate a Token
     */
    #GenerateToken = () => {
        let d = new Date().getTime();
        return 'WolfJS' + 'x'.repeat(64).replace(/[x]/gi, c => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
}