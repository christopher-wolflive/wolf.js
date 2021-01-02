const GenericSimple = require('./GenericSimple');

module.exports = class Message {
    /**
     * @type {string}
     */
    Id;
    
    /**
     * @type {GenericSimple}
     */
    Recipient;
    
    /**
     * @type {GenericSimple}
     */
    Originator;
    
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
     * @type {Buffer}
     */
    Data;
    
    /**
     * @type {string}
     */
    FlightId;
    
    /**
     * @type {}
     */
    MetaData;
}