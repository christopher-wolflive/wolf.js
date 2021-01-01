const AchievementRequests = require('./AchievementRequests');
const BlockedRequests = require('./BlockedRequests');
const CharmRequests = require('./CharmRequests');
const ContactRequests = require('./ContactRequests');
const CreditRequests = require('./CreditRequests');
const DiscoverRequests = require('./DiscoverRequests');
const GroupEventRequests = require('./GroupEventRequests');
const GroupMemberRequests = require('./GroupMemberRequests');
const GroupRequests = require('./GroupRequests');
const MessageRequests = require('./MessageRequests');
const ProductRequests = require('./ProductRequests');
const SearchRequests = require('./SearchRequests');
const SecurityRequests = require('./SecurityRequests');
const StageRequests = require('./StageRequests');
const SubscriberRequests = require('./SubscriberRequests');
const TippingRequests = require('./TippingRequests');

module.exports = {
    ...AchievementRequests,
    ...BlockedRequests,
    ...CharmRequests,
    ...ContactRequests,
    ...CreditRequests,
    ...DiscoverRequests,
    ...GroupEventRequests,
    ...GroupMemberRequests,
    ...GroupRequests,
    ...MessageRequests,
    ...ProductRequests,
    ...SearchRequests,
    ...SecurityRequests,
    ...StageRequests,
    ...SubscriberRequests,
    ...TippingRequests
}