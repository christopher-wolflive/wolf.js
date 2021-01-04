const IO = require('../IO');

module.exports = class AchievementRequests {
    /**
     * Request a list of all achievements
     * @param {IO} io the socket.io client to send the request through
     * @param {number[]} idList the list of achievement ids
     * @param {number} languageId the langauge to get the names and descriptions localized in
     */
    static AchievementList = async (io, idList = null, languageId = null) => await io.Emit('achievement list', (() => {
        let data = {}

        if (idList) data.idList = idList;
        if (languageId) data.languageId = languageId;

        return data;
    })());

    /**
     * Request achievements for a subscriber
     * @param {IO} io the socket.io client to send this request through
     * @param {number} subscriberId the id of the subscriber
     * @param {number} parentId the id of the parent achievement=
     * @param {string} order criteria to oder the result
     */
    static AchievementSubscriberList = async (io, subscriberId, parentId = null, order = null) => await io.Emit('achievement subscriber list', (() => {
        let data = { subscriberId };

        if (parentId) data.parentId = parentId;
        if (order) data.order = order;

        return data;
    })());
}