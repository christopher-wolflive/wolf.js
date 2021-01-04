const { GenericSimple } = require('./GenericModels');

class GroupV2Extended {
    
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
    Category
}

class GroupV2 extends GroupBase {
    
    /**
     * @type {GroupV2Extended}
     */
    Extended = new GroupV2Extended;

    constructor() { super() }
}

class GroupBase {
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
     * @type {GenericSimple}
     */
    Owner = new GenericSimple;
}

class GroupExtended extends GroupV2Extended {
    
    /**
     * @type {number}
     */
    Id;

    constructor() { super() }
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
    StageId;
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
}


class Group {
    
    /**
     * @type {Groupbase}
     */
    Base = new GroupBase;
    
    /**
     * @type {GroupExtended}
     */
    Extended = new GroupExtended;
    
    /**
     * @type {GroupAudioConfig}
     */
    AudioConfig = new GroupAudioConfig;
    
    /**
     * @type {GroupAudioCounts}
     */
    AudioCounts = new GroupAudioCounts;
}

class StatsDetailsBase {
    /**
     * @type {number}
     */
    WordCount;

    /**
     * @type {number}
     */
    LineCount;

    /**
     * @type {number}
     */
    QuestionCount;

    /**
     * @type {number}
     */
    TextCount;

    /**
     * @type {number}
     */
    VoiceCount;

    /**
     * @type {number}
     */
    ImageCount;

    /**
     * @type {number}
     */
    EmoticonCount;

    /**
     * @type {number}
     */
    SwearCount;

    /**
     * @type {number}
     */
    ActionCount;
}

class GroupStatsDetails extends StatsDetailsBase {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {number}
     */
    Name;
    
    /**
     * @type {number}
     */
    HappyCount;
    
    /**
     * @type {number}
     */
    SadCount;
    
    /**
     * @type {number}
     */
    PackCount;
    
    /**
     * @type {number}
     */
    SubscriberCount;

    constructor() { super() }
}

class GroupStatsSubscriber extends StatsDetailsBase {
    
    /**
     * @type {number}
     */
    GroupId;
    
    /**
     * @type {number}
     */
    SubId;
    
    /**
     * @type {number}
     */
    HappyEmoticonCount;
    
    /**
     * @type {number}
     */
    SadEmoticonCount;
    
    /**
     * @type {number}
     */
    PackCount;

    constructor() { super() };
}

class GroupStatsTrendHour {
    
    /**
     * @type {number}
     */
    Hour;
    
    /**
     * @type {number}
     */
    LineCount;
}

class GroupStatsTrendDay {

    /**
     * @type {number}
     */
    Day;

    /**
     * @type {number}
     */
    LineCount;
}

class GroupStatsTrendDate {

    /**
     * @type {number}
     */
    Date;

    /**
     * @type {number}
     */
    LineCount;
}

class GroupStatsSubscriberTopBase {
    
    /**
     * @type {number}
     */
    SubId;
    
    /**
     * @type {number}
     */
    Value;
}

class GroupStatsSubscriberTopWord extends GroupStatsSubscriberTopBase {
    
    /**
     * @type {number}
     */
    WordsPerLine;

    constructor() { super() }
}

class GroupStatsSubscriberTop extends GroupStatsSubscriberTopBase {

    /**
     * @type {number}
     */
    Percentage;

    constructor() { super() }
}

class GroupStats {
    
    /**
     * @type {GroupStatsDetails}
     */
    Details = new GroupStatsDetails;
    
    /**
     * @type {GroupStatsTrendHour[]}
     */
    TrendsHour = [];
    
    /**
     * @type {GroupStatsTrendDay[]}
     */
    TrendsDay = [];
    
    /**
     * @type {GroupStatsTrendDate[]}
     */
    Trends = [];
    
    /**
     * @type {GroupStatsSubscriber[]}
     */
    Top25 = [];
    
    /**
     * @type {GroupStatsSubscriber[]}
     */
    Next30 = new [];
    
    /**
     * @type {GroupStatsSubscriberTopWord[]}
     */
    TopWord = new [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopQuestion = [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopEmoticon = [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopHappy = [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopSwear = [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopImage = [];
    
    /**
     * @type {GroupStatsSubscriberTop[]}
     */
    TopAction = [];
}

module.exports = {
    Group,
    GroupBase,
    GroupAudioConfig,
    GroupAudioCounts,
    GroupExtended,
    GroupV2,
    GroupV2Extended,
    GroupStats,
    GroupStatsDetails,
    GroupStatsSubscriber,
    GroupStatsSubscriberTop,
    GroupStatsSubscriberTopBase,
    GroupStatsSubscriberTopWord,
    GroupStatsTrendDate,
    GroupStatsTrendDay,
    GroupStatsTrendHour,
    StatsDetailsBase
}