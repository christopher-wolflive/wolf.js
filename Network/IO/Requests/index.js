const AchievementRequests = require('./AchievementRequests');
const AudioRequests = require('./AudioRequests');
const BlockedRequests = require('./BlockedRequests');
const CharmRequests = require('./CharmRequests');
const ContactRequests = require('./ContactRequests');
const CreditRequests = require('./CreditRequests');
const DiscoverRequests = require('./DiscoverRequests');
const EventRequests = require('./EventRequests');
const GroupMemberRequests = require('./GroupMemberRequests');
const GroupRequests = require('./GroupRequests');
const MessageRequests = require('./MessageRequests');
const MetadataRequests = require('./MetadataRequests');
const SearchRequests = require('./SearchRequests');
const SecurityRequests = require('./SecurityRequests');
const StageRequests = require('./StageRequests');
const SubscriberRequests = require('./SubscriberRequests');
const TippingRequests = require('./TippingRequests');

module.exports = {
    ...AchievementRequests,
    ...AudioRequests,
    ...BlockedRequests,
    ...CharmRequests,
    ...ContactRequests,
    ...CreditRequests,
    ...DiscoverRequests,
    ...EventRequests,
    ...GroupMemberRequests,
    ...GroupRequests,
    ...MessageRequests,
    ...MetadataRequests,
    ...SearchRequests,
    ...SecurityRequests,
    ...StageRequests,
    ...SubscriberRequests,
    ...TippingRequests
}