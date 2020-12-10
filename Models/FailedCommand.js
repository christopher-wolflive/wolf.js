const Group = require('./Group');
const Message = require('./Message');
const User = require('./User');

module.exports = class FailedCommand {
    Message = new Message({});
    Group = new Group({});
    GroupId = -1;
    User = new User({});
    UserId = -1;
    RequiredRole = 0;
    Command = '';

    /**
     * @param {Message} message
     * @param {Group} group 
     * @param {User} user 
     * @param {number} requiredRole 
     * @param {string} command 
     */
    constructor(message, group, user, requiredRole, command) {
        this.Message = message;
        this.Group = group;
        this.GroupId = group.Id;
        this.User = user;
        this.UserId = user.Id;
        this.RequiredRole = requiredRole;
        this.Command = command;
    }
}
