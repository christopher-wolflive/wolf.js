const IModel = require('./IModel');

class SubscriberCharms {
    /**
     *@type {{ charmId: number, position: number }[]}
     */
    SelectedList;

    constructor(charms) {
        charms & IModel.Assign(this, charms);
    }
}

class SubscriberExtended {
    /**
     * @type {string}
     */
    Name;

    /**
     * @type {string}
     */
    About;

    /**
     * @type {number}
     */
    Gender;

    /**
     * @type {number}
     */
    LookingFor;

    /**
     * @type {number}
     */
    Relationship;

    /**
     * @type {number}
     */
    Language;

    /**
     * @type {string}
     */
    DateOfBirth;

    /**
     * @type {number}
     */
    UTFOffset;

    constructor(extended) {
        extended & IModel.Assign(this, extended);
    }
}

class Subscriber {
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
    Charms;

    /**
     * @type {SubscriberExtended}
     */
    Extended;

    constructor(subscriber) {
        subscriber & IModel.Assign(this, subscriber);

        // Parse Charms
        if (subscriber['charms'])
            this.Charms = new SubscriberCharms(subscriber['charms']);

        // Parse Extended
        if (subscriber['extended'])
            this.Extended = new SubscriberExtended(subscriber['extended']);
    }
}

module.exports = {
    Subscriber,
    SubscriberCharms,
    SubscriberExtended
}