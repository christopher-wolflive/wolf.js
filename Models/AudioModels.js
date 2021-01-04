class GroupAudioConfig {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {boolean}
     */
    Enabled;
    
    /**
     * @type {number}
     */
    MinRepLevel;
    
    /**
     * @type {number}
     */
    StageId;
}

class GroupAudioSlot {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {boolean}
     */
    Locked;
    
    /**
     * @type {number}
     */
    OccupierId;
    
    /**
     * @type {boolean}
     */
    OccupierMuted;
    
    /**
     * @type {string}
     */
    UUID;
    
    /**
     * @type {string}
     */
    ConnectionState;
}

class GroupAudioSlotUpdate {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {GroupAudioSlot}
     */
    Slot = new GroupAudioSlot;
}

class GroupAudioGeneric {
    
    /**
     * @type {string}
     */
    SDP
    
    /**
     * @type {GroupAudioSlot}
     */
    Slot = new GroupAudioSlot;
}

module.exports = {
    GroupAudioConfig,
    GroupAudioSlot,
    GroupAudioSlotUpdate,
    GroupAudioGeneric
}