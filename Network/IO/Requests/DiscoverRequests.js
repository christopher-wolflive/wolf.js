const IO = require('../IO');

module.exports = class DiscoverRequests {
    
    /**
     * Request the Group Gallery List
     * @param {IO} io the socket.io client to request this through
     * @param {number} language the language id
     * @param {number} offset the list offset
     * @param {number} maxResults the maximum number of results to return
     * @param {number} recipeId the recipe id to return
     */
    static GroupGalleryList = async (io, language, offset, maxResults, recipeId) => await io.Emit('group gallery list', { language, offset, maxResults, recipeId });
    
    /**
     * Request the Group Discovery List
     * @param {IO} io the socket.io client to request this through
     * @param {number} language the language id
     * @param {number} offset the list offset
     * @param {number} maxResults the maximum number of results to return
     * @param {number} recipeId the recipe id to return
     */
    static GroupDiscoveryList = async (io, language, offset, maxResults, recipeId) => await io.Emit('group discovery list', { language, offset, maxResults, recipeId });
    
    /**
     * Request the Group Recommendation List
     * @param {IO} io the socket.io client to request this through
     */
    static GroupRecommendationList = async (io) => await io.Emit('group recommendation list', {});
}