const User = require('../User/User');
const Group = require('../Group/Group');

module.exports = class GroupMemberUpdate {
    UserId = -1;
    User = new User();
    GroupId = -1;
    Group = new Group([]);
    Capabilities = -1;

    /**
     * @param {number} id 
     * @param {number} capabilities 
     */
    constructor(userId, user, groupId, group, capabilities) {
        this.UserId = userId;
        this.User = user;
        this.GroupId = groupId;
        this.Group = group;
        this.Capabilities = capabilities;
    }
}