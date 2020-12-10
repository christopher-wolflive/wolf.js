module.exports = class GroupMemberUpdate {
    SubscriberId = -1;
    GroupId = -1;
    Capabilities = -1;

    /**
     * 
     * @param {number} subscriberId 
     * @param {number} groupId 
     * @param {number} capabilities 
     */
    constructor(subscriberId, groupId, capabilities) {
        this.SubscriberId = subscriberId;
        this.GroupId = groupId;
        this.Capabilities = capabilities;
    }
}