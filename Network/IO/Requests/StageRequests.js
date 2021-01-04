const IO = require('../IO');

module.exports = class StageRequests {

    /**
     * Request a list of all stage themes
     * @param {IO} io the socket.io client to send this request through
     * @param {number} language the language id
     */
    static StageList = async (io, language = 1) => await io.Emit('stage list', { language });

    /**
     * Request a list of stage themes available to a group
     * @param {IO} io the socket.io client to send this request through
     * @param {number} id the id of the group
     */
    static StageGroupActiveList = async (io, id) => await io.Emit('stage group active list', { id });
}