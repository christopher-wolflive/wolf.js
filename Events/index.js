const Client = require('../Client');
const { EventEmitter } = require('events');

const AchievementEvents = require('./AchievementEvents');
const BlockedEvents = require('./BlockedEvents');
const CharmEvents = require('./CharmEvents');
const CreditEvents = require('./CreditEvents');
const DiscoverEvents = require('./DiscoverEvents');
const GroupEventEvents = require('./GroupEventEvents');
const GroupEvents = require('./GroupEvents');
const GroupMemberEvents = require('./GroupMemberEvents');
const IOEvents = require('./IOEvents');
const MessageEvents = require('./MessageEvents');
const ProductEvents = require('./ProductEvents');
const SDKEvents = require('./SDKEvents');
const SearchEvents = require('./SearchEvents');
const SecurityEvents = require('./SecurityEvents');
const StageEvents = require('./StageEvents');
const SubscriberEvents = require('./SubscriberEvents');
const TippingEvents = require('./TippingEvents');
const WolfEvents = require('./WolfEvents');

module.exports = class Events {
    IO;
    SDK;
    Security;
    Subscriber;
    Wolf;

    /**
     * New Event Wrapper
     * @param {Client} client the client to bind to 
     * @param {EventEmitter} emitter the client's emitter
     */
    constructor(client, emitter) {
        this.IO = new IOEvents(client, emitter);
        this.SDK = new SDKEvents(client, emitter);
        this.Security = new SecurityEvents(client, emitter);
        this.Subscriber = new SubscriberEvents(client, emitter);
        this.Wolf = new WolfEvents(client, emitter);
    }
}