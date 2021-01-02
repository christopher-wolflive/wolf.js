const StatsDetails = require('./StatsDetails');
const StatsSubscriber = require('./StatsSubscriber');
const StatsSubscriberTop = require('./StatsSubscriberTop');
const StatsSubscriberTopWord = require('./StatsSubscriberTopWord');
const { StatsTrendsDate, StatsTrendsDay, StatsTrendsHour } = require('./StatsTrends');

module.exports = class {
    
    /**
     * @type {StatsDetails}
     */
    Details = new StatsDetails;
    
    /**
     * @type {StatsTrendsHour[]}
     */
    TrendsHour = [];
    
    /**
     * @type {StatsTrendsDay[]}
     */
    TrendsDay = [];
    
    /**
     * @type {StatsTrendsDate[]}
     */
    Trends = [];
    
    /**
     * @type {StatsSubscriber[]}
     */
    Top25 = [];
    
    /**
     * @type {StatsSubscriber[]}
     */
    Next30 = [];
    
    /**
     * @type {StatsSubscriberTopWord[]}
     */
    TopWord = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopQuestion = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopEmoticon = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopHappy = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopSad = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopSwear = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopImage = [];
    
    /**
     * @type {StatsSubscriberTop[]}
     */
    TopAction = [];
}