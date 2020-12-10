const { AssignValues } = require('../Constants');

class Group {
    Id = -1;
    Name = '';
    Hash = '';
    Description = '';
    LongDescription = '';
    Reputation = 0.0;
    Premium = false;
    Members = 0;
    Official = false;
    Owner = { id: -1, hash: '' };
    Icon = 0;
    Language = 0;
    Peekable = false;
    Discoverable = false;
    AdvancedAdmin = false;
    Locked = false;
    Questionable = true;
    EntryLevel = 0;
    Passworded = true;
    Langauge = 1;
    AudioConfig = new GroupAudioConfig({});
    AudioCounts = new GroupAudioCounts({});

    constructor(obj) {
        const { base, extended, audioConfig, audioCounts } = obj;

        if (base)
            AssignValues(this, base);

        if (extended)
            AssignValues(this, extended);

        if (audioConfig)
            this.AudioConfig = new GroupAudioConfig(audioConfig);

        if (audioCounts)
            this.AudioCounts = new GroupAudioCounts(audioCounts);
    }
}

class GroupAudioConfig {
    Id = -1;
    Enabled = false;
    MinRepLevel = 0;
    StageId = 0;

    constructor(obj) {
        obj && AssignValues(this, obj);
    }
}

class GroupAudioCounts {
    Id = -1;
    ConsumerCount = 0;
    BroadcasterCount = 0;

    constructor(obj) {
        obj && AssignValues(this, obj);
    }
}

module.exports = {
    Group,
    GroupAudioConfig,
    GroupAudioCounts
}