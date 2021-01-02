const { assign } = require('./util');
const Client = require('../Client');
const Group = require('../Models/Group/Group');
const Requests = require('../Network/IO/Requests');
const StatsDetails = require('../Models/GroupStats/StatsDetails');
const StatsSubscriber = require('../Models/GroupStats/StatsSubscriber');
const StatsSubscriberTop = require('../Models/GroupStats/StatsSubscriberTop');
const StatsSubscriberTopWord = require('../Models/GroupStats/StatsSubscriberTopWord');
const { StatsTrendsDate, StatsTrendsDay, StatsTrendsHour } = require('../Models/GroupStats/StatsTrends');
const GroupStats = require('../Models/GroupStats/GroupStats');

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

    /**
     * Get the stats for a group
     * @param {number} id the id of the group
     * @returns {GroupStats}
     */
    GetStats = async (id) => {
        try {
            let response = await Requests.GroupStats(this.#Client.V3, id);

            let { details, trendsHour, trendsDay, trends, top25, next30, topWord, topQuestion, topEmoticon, topHappy, topSad, topSwear, topImage, topAction } = response.body;

            details = assign(new StatsDetails, details);
            trendsHour = trendsHour.map(th => assign(new StatsTrendsHour, th));
            trendsDay = trendsDay.map(td => assign(new StatsTrendsDay, td));
            trends = trends.map(t => assign(new StatsTrendsDate, t));
            top25 = top25.map(t25 => assign(new StatsSubscriber, t25));
            next30 = next30.map(n30 => assign(new StatsSubscriber, n30));
            topWord = topWord.map(tw => assign(new StatsSubscriberTopWord, tw));
            topQuestion = topQuestion.map(tq => assign(new StatsSubscriberTop, tq));
            topEmoticon = topEmoticon.map(te => assign(new StatsSubscriberTop, te));
            topHappy = topHappy.map(th => assign(new StatsSubscriberTop, th));
            topSad = topHappy.map(ts => assign(new StatsSubscriberTop, ts));
            topSwear = topSwear.map(ts => assign(new StatsSubscriberTop, ts));
            topImage = topImage.map(ti => assign(new StatsSubscriberTop, ti));
            topAction = topAction.map(ta => assign(new StatsSubscriberTop, ta));

            let stats = assign(new GroupStats, { details, trendsHour, trendsDay, trends, top25, next30, topWord, topQuestion, topEmoticon, topHappy, topSad, topSwear, topImage, topAction });

            return stats;
        } catch { return null; };
    }
}