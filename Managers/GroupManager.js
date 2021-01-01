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
    GetGroup = async (nameOrId, entities, subscribe) => {
        try {
            let response = await Requests.GroupProfile(this.#Client.V3, nameOrId, entities, subscribe);

            let { base, extended, audioConfig, audioCounts } = response.body;

            return assign(new Group, { ...base, extended, audioConfig, audioCounts });
        } catch { return null }
    }

    GetGroups = async (idList, entities, subscribe)
}