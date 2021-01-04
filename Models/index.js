const AchievementModels = require('./AchievementModels');
const AudioModels = require('./AudioModels');
const ContactBlockedModels = require('./ContactBlockedModels');
const CharmModels = require('./CharmModels');
const CreditModels = require('./CreditModels');
const DiscoverModels = require('./DiscoverModels');
const EventModels = require('./EventModels');
const GenericModels = require('./GenericModels');

module.exports = {
    ...AchievementModels,
    ...AudioModels,
    ...ContactBlockedModels,
    ...CharmModels,
    ...CreditModels,
    ...DiscoverModels,
    ...EventModels,
    ...GenericModels,
}