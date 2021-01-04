const Requests = require('../Network/IO/Requests');
const Client = require('../Client');

module.exports = class AchievementManager {
    /**
     * @type {Client}
     */
    #Client

    /**
     * Crate a new AchievementManager
     * @param {Client} client
     */
    constructor(client) {
        this.#Client = client;
    }

    /**
     * returns array of charm lists
     * @param {number[]} idList the list of achievement ids
     * @param {number} languageId the langauge to get the names and descriptions localized in
     * @returns {Promise<*|null>}
     */
    AchievementList = async(idList = null, languageId = 1) => {
        try {
            return await Requests.AchievementList(this.#Client.V3, idList, languageId);
        } catch { }
    }

    /**
     * Return given users charms.
     * @param {number} subscriberId 
     * @param {number} parentId 
     * @param {number} order 
     */
    AchievementSubscriberList = async (subscriberId, parentId = null, order = null) => {
        try {
            return  await Requests.AchievementSubscriberList(this.#Client.V3, subscriberId, parentId, order);
        } catch { }
    }
}