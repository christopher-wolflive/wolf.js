class GroupEvent {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {number}
     */
    GroupId;
    
    /**
     * @type {string}
     */
    Title;
    
    /**
     * @type {string}
     */
    ShortDescription;
    
    /**
     * @type {string}
     */
    LongDescription;
    
    /**
     * @type {string}
     */
    StartsAt;
    
    /**
     * @type {string}
     */
    EndsAt;
}

class GroupEventHash {
    
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {number}
     */
    GroupId;

    /**
     * @type {string}
     */
    Hash;
}

module.exports = {
    GroupEvent,
    GroupEventHash
}