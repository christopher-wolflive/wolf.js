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
     * @returns {Promise<*|null>}
     */
    AchievementList = async() => {
        try {
            return await Requests.AchievementList(this.#Client.V3);
        } catch { }
    }

    AchievementSubscriberList = async (subscriberId, parentId = null, order = null) => {
        try {
            return  await Requests.AchievementSubscriberList(this.#Client.V3, subscriberId, parentId, order);
        } catch { }
    }
}