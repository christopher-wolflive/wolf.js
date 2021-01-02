const { assign } = require('./util');
const Client = require('../Client');
const Requests = require('../Network/IO/Requests');
const Message = require('../Models/Message/Message');

module.exports = class MessageManager {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * Create a new Message Manager
     * @param {Client} client 
     */
    constructor(client) {
        this.#Client = client;
    }

    /**
     * Send a Message
     * @param {number} recipient the recipient of the message
     * @param {boolean} isGroup is the message ment for a group
     * @param {string | Buffer} data the data to be sent
     * @param {string} mimeType the mimetype of the message
     */
    SendMessage = async (recipient, isGroup, data, mimeType) => {
        try {
            let resp = await Requests.MessageSend(this.#Client.V3, recipient, isGroup, data, mimeType);

            let { uuid: id, timestamp } = resp.body;

            let mesg = assign(new Message, {
                id,
                timestamp,
                recipient: { id: recipient, hash: '' },
                originator: { id: this.#Client.CurrentUser.Id, hash: this.#Client.CurrentUser.Hash },
                isGroup,
                data,
                mimeType
            });

            this.#Client.On.Message.Sent(mesg);

            return true;
        } catch { return false;}
    }
}