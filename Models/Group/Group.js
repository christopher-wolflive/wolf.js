const SubscriberSimple = require('../Subscriber/SubscriberSimple');
const GroupAudioConfig = require('./GroupAudioConfig');
const GroupAudioCounts = require('./GroupAudioCounts');
const GroupExtended = require('./GroupExtended');

module.exports = class Group {
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {string}
     */
    Name;

    /**
     * @type {string}
     */
    Hash;

    /**
     * @type {string}
     */
    Description;

    /**
     * @type {number}
     */
    Reputation;

    /**
     * @type {boolean}
     */
    Premium;

    /**
     * @type {number}
     */
    Icon;

    /**
     * @type {number}
     */
    Members;

    /**
     * @type {boolean}
     */
    Official;
    
    /**
     * @type {boolean}
     */
    Peekable;

    /**
     * @type {SubscriberSimple}
     */
    Owner = new SubscriberSimple;

    /**
     * @type {GroupExtended}
     */
    Extended = new GroupExtended;

    /**
     * @type {GroupAudioConfig}
     */
    AudioConfig = new GroupAudioConfig;

    /**
     * @type {GroupAudioCounts}
     */
    AudioCounts = new GroupAudioCounts;
}