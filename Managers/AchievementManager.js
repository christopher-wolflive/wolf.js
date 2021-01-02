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

    GetAllAchievements = async() => {
        try {
            let charmList = await Requests.AchievementList();
            return charmList.body;
        } catch {return null}
    }
}