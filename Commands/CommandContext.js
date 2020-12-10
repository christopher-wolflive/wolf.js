const Client = require('../Client');
const { Message, User, Group } = require('../Models');

class CommandContext {
    Client;
    Message;
    User;
    Group;
    Remainder = '';

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {User} user
     * @param {Group} group
     * @param {string} remainder
     */
    constructor(client, message, user, group, remainder) {
        this.Client = client;
        this.Message = message;
        this.User = user;
        this.Group = group;
        this.Remainder = remainder
    }

    /**
     * 
     * @param {string} content 
     */
    ReplyText = async (content) => {
        await this.Client.SendMessage(
            this.Message.IsGroup ? this.Message.Recipient : this.Message.Originator,
            content,
            this.Message.IsGroup
        );
    }
}

module.exports = {
    CommandContext
}