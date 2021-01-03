const Events = require('./Events');
const { EventEmitter } = require('events');
const GroupManager = require('./Managers/GroupManager');
const IO = require('./Network/IO/IO');
const MessageManager = require('./Managers/MessageManager');
const Requests = require('./Network/IO/Requests');
const StageManager = require('./Managers/StageManager');
const SubscriberManager = require('./Managers/SubscriberManager');
const Subscriber = require('./Models/Subscriber/Subscriber');

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
     * @type {GroupManager}
     */
    Groups;

    /**
     * @type {MessageManager}
     */
    Messages;

    /**
     * @type {StageManager}
     */
    Stages;

    /**
     * @type {SubscriberManager}
     */
    Subscribers;

    constructor(token = null) {
        this.Token = token ?? this.#GenerateToken();
        this.V3 = new IO(this);
        this.Emitter = new EventEmitter();
        this.Emitter.setMaxListeners(Number.MAX_SAFE_INTEGER);

        this.Groups = new GroupManager(this);
        this.Messages = new MessageManager(this);
        this.Stages = new StageManager(this);
        this.Subscribers = new SubscriberManager(this);

        this.On = new Events(this, this.Emitter);
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

            // Fetch the Current Subsciber and subscribe to updates to self
            subscriber = await this.Subscribers.GetSubscriber(subscriber.id, true, true);

            this.CurrentUser = subscriber;

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