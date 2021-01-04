const IO = require('../IO');

module.exports = class MessageRequests {

    /**
     * Subscribe to all group messages
     * @param {IO} io the socket.io client to send this request through
     */
    static MessageGroupSubscribe = async (io) => await io.Emit('message group subscribe', {
        headers: { version: 4 }
    });

    /**
     * Subscribe to all private messages
     * @param {IO} io the socket.io client to send this request through
     */
    static MessagePrivateSubscribe = async (io) => await io.Emit('message private subscribe');

    /**
     * Request the current subscriber's message list
     * @param {IO} io the socket.io client to send this request through
     * @param {number} timestamp the timestamp (unix epoch) to start from
     */
    static MessageConversationList = async (io, timestamp) => await io.Emit('message conversation list', {
        headers: { version: 4 },
        body: { timestamp }
    });

    /**
     * Request the Message Settings for the current subscriber
     * @param {IO} io the socket.io client to send this request through
     */
    static MessageSetting = async (io) => await io.Emit('message setting', {});

    /**
     * Update the current subscriber's message settings
     * @param {IO} io the socket.io client to send this request through
     * @param {boolean} enabled whether or not the spam filter is enabled
     * @param {number} tier the level of the spam filter
     */
    static MessageSettingUpdate = async (io, enabled, tier) => await io.Emit('message setting update', { spamFilter: { enabled, tier } });

    /**
     * Update the content of a message
     * @param {IO} io the socket.io client to send this request through
     * @param {number} recipientId the recipient id of the message
     * @param {number} timestamp the timestamp of the message
     * @param {boolean} isGroup whether this a group message or not
     * @param {String | any} data the data of the message
     */
    static MessageUpdateData = async (io, recipientId, timestamp, isGroup, data) => await io.Emit('message update', { recipientId, timestamp, isGroup, data });
    
    /**
     * Update the deletion status of a message
     * @param {IO} io the socket.io client to send this request through
     * @param {number} recipientId the recipient id of the message
     * @param {number} timestamp the timestamp of the message
     * @param {boolean} isGroup whether this a group message or not
     * @param {boolean} isDeleted whether this is delete or not
     */
    static MessageUpdateDeleted = async (io, recipientId, timestamp, isGroup, isDeleted) => await io.Emit('message update', { recipientId, timestamp, isGroup, metadata: { isDeleted } });
    
    /**
     * Get a list of message update history
     * @param {IO} io the socket.io client to send this request through
     * @param {number} recipientId the recipient id of the message
     * @param {number} timestamp the timestamp of the message
     * @param {boolean} isGroup whether this a group message or not
     * @param {number} offsetTimestamp get history from this unix epoch timestamp
     * @param {number} limit the limit of results to return
     */
    static MessageUpdateList = async (io, recipientId, timestamp, isGroup, offsetTimestamp, limit) => await io.Emit('message update list', { recipientId, timestamp, isGroup, offsetTimestamp, limit });

    /**
     * Send a Message
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} recipient the recpiient of this message
     * @param {boolean} isGroup is the message meant for a group
     * @param {string | Buffer} data the data to be sent
     * @param {string} mimeType the mimetype of the data
     */
    static MessageSend = async (io, recipient, isGroup, data, mimeType) => await io.Emit('message send', {
        recipient,
        isGroup,
        data,
        mimeType,
        flightId: `wolf.js_${recipient}_${new Date().getTime()}`
    });

    /**
     * Add a subscriber to the current subscriber's whitelist
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the subscriber
     */
    static SubscriberWhitelistAdd = async (io, id) => await io.Emit('subscriber whitelist add', { id });
}