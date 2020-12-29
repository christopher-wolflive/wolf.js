const Client = require('../Client');
const { Group } = require('../Models/Group');
const { GroupRequests } = require('../Network/Requests');

/**
 * Group Cache Manager (shared caching)
 */
module.exports = class GroupManager {
    /**
     * The static cache to be shared across all clients
     * @type {Group[]}
     */
    static Cache = [];

    /**
     * The Client to send requests through
     * @type {Client}
     */
    Client;

    /**
     * Create a new Group Manager wrapped around a client
     * @param {Client} client the client to use for requests 
     */
    constructor(client) {
        this.Client = client;
    }

    /**
     * Get a Group by Name or ID
     * @param {number | string} nameorId the name or id of the group
     * @param {string[]} entities the entities to fetch for the group
     * @param {boolean} subscribe subscribe to group profile updates
     */
    Get = async (nameorId, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = true) => {
        // If Cache is undefined, define it
        if (!this.Cache)
            this.Cache = [];
        
        // Fetch Group from Cache
        let group = this.Cache.find(grp => grp.Id === nameorId || grp.Name === nameorId);

        if (group)
            return group;
        
        group = await GroupRequests.Get(this.Client.Socket, nameorId, entities, subscribe);

        if (group.code !== 200)
            return null;
        
        group = new Group(group.body)

        this.Cache.push(group);

        return group;
    }

    /**
     * Get Groups by their IDs
     * @param {number[]} idList the ids of the groups
     * @param {string[]} entities the entities to fetch for the group
     * @param {boolean} subscribe subscribe to group profile updates
     * @returns {Group[]}
     */
    GetMultiple = async (idList, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = true) => {
        // If cache is undefined, define it
        if (!this.Cache)
            this.Cache = [];
        
        // Get cached groups
        let groups = this.Cache.filter(grp => idList.includes(grp.Id));

        // Filter out cached group ids
        idList = idList.filter(id => !groups.some(grp => grp.Id === id));

        // Request the missing groups
        let fetched = Object.values(await GroupRequests.GetMultiple(this.Client.Socket, idList, entities, subscribe)).filter(t => t.code === 200).map(t => new Group(t.body));

        // Add fetched to cache
        this.Cache.push(...fetched);

        // Add Fetched to groups array
        groups.push(...fetched);

        return groups;
    }
}