const Message = require('./Message');

module.exports = class GroupMessage extends Message {
    OriginatorGroupRole = -1;
            
    /**
     * 
     * @param {any} data
     */
    constructor(data, originatorGroupRole) {
        super(data);
        this.OriginatorGroupRole = originatorGroupRole
    }
}