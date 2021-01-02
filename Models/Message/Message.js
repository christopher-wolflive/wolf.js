const GenericSimple = require('./GenericSimple');

module.exports = class Message {
    /**
     * @type {string}
     */
    Id;
    
    /**
     * @type {GenericSimple}
     */
    Recipient = new GenericSimple;
    
    /**
     * @type {GenericSimple}
     */
    Originator = new GenericSimple;
    
    /**
     * @type {boolean}
     */
    IsGroup;
    
    /**
     * @type {number}
     */
    Timestamp;
    
    /**
     * @type {string}
     */
    MimeType;
    
    /**
     * @type {string | Buffer}
     */
    Data = undefined;

    /**
     * @type {string}
     */
    Content;
    
    /**
     * @type {string}
     */
    FlightId;
    
    /**
     * @type {}
     */
    MetaData;
}