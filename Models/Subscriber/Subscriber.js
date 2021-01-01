const SubscriberExtended = require('./SubscriberExtended');
const SubscriberCharms = require('./SubscriberCharms');

module.exports = class Subscriber {
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {string}
     */
    Hash;

    /**
     * @type {number}
     */
    Privileges;

    /**
     * @type {string}
     */
    Nickname;

    /**
     * @type {string}
     */
    Status;

    /**
     * @type {number}
     */
    Reputation;

    /**
     * @type {number}
     */
    Icon;

    /**
     * @type {number}
     */
    OnlineState;

    /**
     * @type {number}
     */
    DeviceType;

    /**
     * @type {SubscriberCharms}
     */
    Charms = new SubscriberCharms();

    /**
     * @type {SubscriberExtended}
     */
    Extended = new SubscriberExtended();
}