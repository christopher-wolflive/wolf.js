const IModel = require('./IModel');

class Simple {
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {string}
     */
    Hash;

    constructor(simple) {
        simple & IModel.Assign(this, simple);
    }
}

class GroupExtended {
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {boolean}
     */
    Discoverable;

    /**
     * @type {boolean}
     */
    AdvancedAdmin;

    /**
     * @type {boolean}
     */
    Locked;

    /**
     * @type {boolean}
     */
    Questionable;

    /**
     * @type {number}
     */
    EntryLevel;

    /**
     * @type {boolean}
     */
    Passworded;

    /**
     * @type {number}
     */
    Language;

    /**
     * @type {string}
     */
    LongDescription;

    /**
     * @type {number}
     */
    Category;

    constructor(extended) {
        extended & IModel.Assign(this, extended);
    }
}

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
    StageID;

    constructor(audioConfig) {
        audioConfig & IModel.Assign(this, audioConfig);
    }
}

class GroupAudioCounts {
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {number}
     */
    ConsumerCount;

    /**
     * @type {number}
     */
    BroadcasterCount;

    constructor(audioCounts) {
        audioCounts & IModel.Assign(this, audioCounts);
    }
}

class Group {
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {string}
     */
    Name;

    /**
     * @type {string}
     */
    Hash;

    /**
     * @type {string}
     */
    Description;

    /**
     * @type {number}
     */
    Reputation;

    /**
     * @type {boolean}
     */
    Premium;

    /**
     * @type {number}
     */
    Icon;

    /**
     * @type {number}
     */
    Members;

    /**
     * @type {boolean}
     */
    Official;

    /**
     * @type {boolean}
     */
    Peekable;

    /**
     * @type {Simple}
     */
    Owner;

    /**
     * @type {GroupExtended}
     */
    Extended;

    /**
     * @type {GroupAudioCounts}
     */
    AudioCounts;

    /**
     * @type {GroupAudioConfig}
     */
    AudioConfig;

    constructor(group) {
        // Parse Base
        if (group['base'])
            IModel.Assign(this, group['base']);

        // Parse Owner
        if (group['owner'])
            this.Owner = new Simple(group['owner']);
        
        // Parse Extended
        if (group['extended'])
            this.Extended = new GroupExtended(group['extended']);
        
        // Parse Audio Config
        if (group['audioConfig'])
            this.AudioConfig = new GroupAudioConfig(group['audioConfig']);
        
        // Parse Audio Counts
        if (group['audioCounts'])
            this.AudioCounts = new GroupAudioCounts(group['audioCounts']);
    }
}

module.exports = {
    Group,
    GroupAudioConfig,
    GroupAudioCounts,
    GroupExtended,
    Simple
}