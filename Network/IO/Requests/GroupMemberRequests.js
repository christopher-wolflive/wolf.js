const IO = require('../IO');

module.exports = class GroupMemberRequests {
    
    /**
     * 
     * @param {IO} io the socket.io client to send this request through 
     * @param {string | number} nameOrId the name or id of the group
     * @param {string} password the password of the group
     * @param {number} referredBy the id of the subscriber who referred the client
     */
    static GroupMemberAdd = async (io, nameOrId, password = null, referredBy = null) => await io.Emit('group member add', (() => {
        let data = { [typeof nameOrId === 'string' ? 'name' : 'id']: nameOrId };

        if (password) data.password = password;
        if (referredBy) data.referredBy = referredBy;

        return data;
    })());
    
    /**
     * 
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} groupId the id of the group
     * @param {number} subscriberId the id of the subscriber
     * @param {number} capabilities the new capabilities of the subscriber
     */
    static GroupMemberUpdate = async (io, groupId, subscriberId, capabilities) => await io.Emit('group member update', { groupId, subscriberId, capabilities });
    
    /**
     * 
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} subscriberId the id of the subscriber
     */
    static GroupMemberDelete = async (io, subscriberId) => await io.Emit('group member delete', { subscriberId });
    
    /**
     * 
     * @param {IO} io the socket.io client to send this request through 
     * @param {number} id the id of the group
     * @param {boolea} subscribe subscribe to updates to the group member list
     */
    static GroupMemberList = async (io, id, subscribe = false) => await io.Emit('group member list', {
        headers: { version: 3 },
        body: { id, subscribe }
    });
}