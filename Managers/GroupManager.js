const { assign } = require('./util');
const Client = require('../Client');
const Group = require('../Models/Group/Group');
const Requests = require('../Network/IO/Requests');

module.exports = class GroupManager {
    /**
     * @type {Client}
     */
    #Client;

    /**
     * Crate a new GroupManager
     * @param {Client} client 
     */
    constructor(client) {
        this.#Client = client;
    }

    /**
     * Get a Group by Name or ID
     * @param {string | number} nameOrId 
     * @param {{'base' | 'extended' | 'audioConfig' | 'audioCounts'}[]} entities
     * @param {boolean} subscribe 
     * @returns {Group}
     */
    GetGroup = async(nameOrId, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = false) => {
        try {
            let response = await Requests.GroupProfile(this.#Client.V3, nameOrId, entities, subscribe);

            let { base, extended, audioConfig, audioCounts } = response.body;

            let group = assign(new Group, { ...base, extended, audioConfig, audioCounts });

            this.#Client.On.Groups.Fetched(group);

            return group;
        } catch { return null };
    }

    /**
     * Get Groups by their IDs
     * @param {number[]} idList the list of groups ids
     * @param {*} entities the entities to fetch
     * @param {*} subscribe subscribe to changes to the group profiles
     */
    GetGroups = async (idList, entities = ['base', 'extended', 'audioConfig', 'audioCounts'], subscribe = false) => {
        try {
            let response = await Requests.GroupProfiles(this.#Client.V3, idList, entities, subscribe);
            
            let groups = response.map(t => { return assign(new Group, { ...t.base, extended: t.extended, audioConfig: t.audioConfig, audioCounts: t.audioCounts }) });
            groups.forEach(group => this.#Client.On.Groups.Fetched(group));

            return groups;
        } catch { return []; };
    }
}