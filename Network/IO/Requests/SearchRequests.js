const IO = require('../IO');

module.exports = class SearchRequests {
    /**
     * 
     * @param {IO} io the socket.io client to send this request through
     * @param {string} query the search query
     * @param {number} maxResults the max results to return
     * @param {number} offset the offset of the list
     * @param {string[]} types the types of search
     */
    static Search = async (io, query, maxResults, offset, types = [ 'related', 'groups' ]) => io.Emit('search', { types, query, maxResults, offset });
}