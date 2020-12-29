const { AuthRequests } = require('./Network/Requests');
const Events = require('./Events/Events');
const GroupManager = require('./Managers/GroupManager');
const Socket = require('./Network/Socket');
const { Subscriber } = require('./Models/Subscriber');
const SubscriberManager = require('./Managers/SubscriberManager');

/**
 * WOLF Client - Used for interacting with the service
 */
module.exports = class Client {
    /**
     * The User signed into this session
     * @type {Subscriber}
     */
    AuthUser = null;

    /**
     * The Token to Associate with this Client
     * @type {string}
     */
    Token;

    /**
     * The Underlying Socket.IO Handler
     * @type {Socket}
     */
    Socket;

    /**
     * Events Handler
     * @type {Events}
     */
    On;

    /**
     * Functions relating to fetching and updating groups
     * @type {GroupManager}
     */
    Groups;

    /**
     * Functions relating to fetching and updating subscribers
     * @type {SubscriberManager}
     */
    Subscribers;

    /**
     * Create a new WOLF Client
     * @param {string} token Token to use, optional
     */
    constructor(token = null) {
        this.Token = token ?? this.#GenerateToken();
        this.Socket = new Socket(this);

        this.On = new Events(this);

        this.On.BindEvents(this);

        this.Groups = new GroupManager(this);
        this.Subscribers = new SubscriberManager(this);
    }

    /**
     * Login to WOLF with the Given Account Credentials
     * @param {string} email the email to use
     * @param {string} password the password to use
     * @param {number} onlineState the targeted online state
     * @returns {boolean} rather the login was successful or not
     */
    Login = async (email, password, onlineState = 1) => {
        let response = await AuthRequests.Login(this.Socket, email, password, onlineState);

        if (response.code !== 200) {
            this.On.LoginFailed(response.headers.subCode);
            return false;
        }

        this.AuthUser = await this.Subscribers.Get(response.body.id);

        this.On.LoginSuccess(this.AuthUser);

        return true;
    }

    /**
     * Logout from WOLF
     * @returns {boolean} rather the logout was successful or not
     */
    Logout = async () => {
        let response = await AuthRequests.Logout(this.Socket);

        return response.code === 200;
    }

    /**
     * Generate a Token to use with this session
     * @returns {string}
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