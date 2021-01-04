const IO = require('../IO');

module.exports = class TippingRequests {
    
    /**
     * Add a tip to someone on stage or a message
     * @param {IO} io the socket.io client to send this request through
     * @param {number} subscriberId the id of the subscriber
     * @param {number} groupid the id of the group
     * @param {{ id: number, quantity: number }[]} charmList the ids and quantities of the charms to add
     * @param {{ type: string, id: number }} context the type and context id
     */
    static TipAdd = async (io, subscriberId, groupId, charmList, context) => await io.Emit('tip add', { subscriberId, groupId, charmList, context });
    
    /**
     * Get the details about a tip for a context
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the id of the group
     * @param {string} contextType the context type
     * @param {number} id the id of the context
     * @param {number} offset the offset of the list
     * @param {number} limit the limit of the list
     */
    static TipDetail = async (io, groupId, contextType, id, offset, limit) => await io.Emit('tip detail', { groupId, contextType, id, offset, limit });
    
    /**
     * Get the Summary of Tips for a context
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the id of the group
     * @param {string} contextType the context type
     * @param {number} id the id of the context
     */
    static TipSummary = async (io, groupId, contextType, id) => await io.Emit('tip summary', { groupId, contextType, id });
    
    /**
     * Get the summaries of tips for multiple contexts
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the group id
     * @param {string} contextType the context type
     * @param {number[]} idList the ids of the context
     */
    static TipSummaries = async (io, groupId, contextType, idList) => await io.Emit('tip summary', { groupId, contextType, idList });
    
    /**
     * Subscribe to Tip Events in Groups
     * @param {IO} io the socket.io client to send this request through
     */
    static TipGroupSubscribe = async (io) => await io.Emit('tip group subscribe', {});
    
    /**
     * Get the Tipping Leaderboard for a Group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the group id
     * @param {string} type the type
     * @param {string} period the period
     * @param {string} tipDirection the direction
     */
    static TipLeaderboardGroup = async (io, groupId, type, period, tipDirection) => await io.Emit('tip leaderboard group', { groupId, type, period, tipDirection });
    
    /**
     * Get the Tipping Leaderboard Summary for a Group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} groupId the group id
     */
    static TipLeaderboardGroupSummary = async (io, groupId) => await io.Emit('tip leaderboard group summary', { groupId });
    
    /**
     * Get the Global Tipping Leaderboard
     * @param {IO} io the socket.io client to send this request through
     * @param {string} type the type
     * @param {string} period the period
     * @param {string} tipDirection the direction
     */
    static TipLeaderboardGlobal = async (io, type, period, tipDirection) => await io.Emit('tip leaderboard global', { type, period, tipDirection });
    
    /**
     * Get the Global Tipping Leaderboard Summary
     * @param {IO} io the socket.io client to send this request through
     * @param {string} period the period
     */
    static TipLeaderboardGlobalSummary = async (io, period) => await io.Emit('tipe leaderboard global summary', { period });
}