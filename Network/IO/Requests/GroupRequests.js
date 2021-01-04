const IO = require('../IO');

module.exports = class GroupRequests {

    /**
     * Create a Group
     * @param {IO} io the socket.io clien to route this through
     * @param {any} data the data to create the group with
     */
    static GroupCreate = async (io, data) => await io.Emit('group create', data);

    /**
     * Get a Group by name or id
     * @param {IO} io the socket.io clien to route this through
     * @param {string | number} nameOrId the name or id of the group
     * @param {{'base' | 'extended' | 'audioConfig' | 'audioCounts'}[]} entities the entities of the group to fetch
     * @param {boolean} subscribe subscribe to group profile updates
     */
    static GroupProfile = async (io, nameOrId, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = false) => await io.Emit('group profile', {
        headers: { version: 4 },
        body: {
            [typeof nameOrId === 'string' ? 'name' : 'id']: nameOrId,
            entities,
            subscribe
        }
    });

    /**
     * Get Multiple Groups by ID
     * @param {IO} io the socket.io clien to route this through
     * @param {number[]} idList the ids of the groups
     * @param {{'base' | 'extended' | 'audioConfig' | 'audioCounts'}[]} entities the entities of the groups to fetch
     * @param {boolean} subscribe subscribe to profile updates to these groups
     */
    static GroupProfiles = async (io, idList, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = false) => await io.Emit('group profile', {
        headers: { version: 4 },
        body: {
            idList,
            entities,
            subscribe
        }
    });

    /**
     * Get the stats for a group
     * @param {IO} io the entities of the group to fetch
     * @param {number} id the id of the group
     */
    static GroupStats = async (io, id) => await io.Emit('group stats', {
        headers: { version: 2 },
        body: { id }
    });

    /**
     * Update a Group
     * @param {IO} io the socket.io clien to route this through
     * @param {number} id the id of the group to update
     * @param {data} data the data to update the group with
     */
    static GroupProfileUpdate = async (io, id, data) => await io.Emit('group profile update', { id, ...data });
}