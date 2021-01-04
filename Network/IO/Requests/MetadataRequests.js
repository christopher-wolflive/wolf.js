const IO = require('../IO');

module.exports = class SecurityRequests {

    /**
     * Get metadata about a url
     * @param {IO} io the socket.io client to send this request through
     * @param {*} url the url
     */
    static MetadataUrl = async (io, url) => await io.Emit('metadata url', { url });

    /**
     * Get the list of blacklisted URLs
     * @param {IO} io the socket.io client to send this request through
     */
    static MetadataUrlBlacklist = async (io) => await io.Emit('metadata url blacklist', {});
}