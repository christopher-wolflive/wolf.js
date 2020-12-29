const Socket = require('../Socket');

/**
 * Singleton Packet Templates relating to Group Requests
 */
module.exports = class GroupRequests {

    /**
     * Get a Group by ID or Name 
     * @param {Socket} socket the socket to request this information through 
     * @param {number | string} nameOrId the name or id of the group
     * @param {string[]} entities the entities to fetch for the group
     * @param {boolean} subscribe subscribe to group profile updates
     */
    static Get = async (socket, nameOrId, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = true) => await socket.Emit('group profile', {
        headers: { version: 4 },
        body: {
            [typeof nameOrId === 'string' ? 'name' : 'id']: nameOrId,
            entities,
            subscribe
        }
    });

    /**
     * Get Groups by their IDs
     * @param {Socket} socket the socket to request this information through
     * @param {number[]} idList the ids of the groups
     * @param {string[]} entities the entities to fetch for the group
     * @param {boolean} subscribe subscribe to group profile updates
     */
    static GetMultiple = async (socket, idList, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = true) => await socket.Emit('group profile', {
        headers: { version: 4 },
        body: { idList, entities, subscribe }
    });
}