const SubscriberExtended = require('./SubscriberExtended');
const SubscriberCharms = require('./SubscriberCharms');

module.exports = class Subscriber {
    /**
     * @type {number}
     */
    Id = -1;
    
    /**
     * @type {string}
     */
    Hash = '';

    /**
     * @type {number}
     */
    Privileges = -1;

    /**
     * @type {string}
     */
    Nickname = '';

    /**
     * @type {string}
     */
    Status = '';

    /**
     * @type {number}
     */
    Reputation = 0;

    /**
     * @type {number}
     */
    Icon = 0;

    /**
     * @type {number}
     */
    OnlineState = 0;

    /**
     * @type {number}
     */
    DeviceType = 0;

    /**
     * @type {SubscriberCharms}
     */
    Charms = new SubscriberCharms();

    /**
     * @type {SubscriberExtended}
     */
    Extended = new SubscriberExtended();
}