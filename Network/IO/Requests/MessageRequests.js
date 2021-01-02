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
}