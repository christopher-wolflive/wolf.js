const GroupAudioConfig = require('./GroupAudioConfig');
const GroupAudioCounts = require('./GroupAudioCounts');

module.exports = class Group {
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
    MemberList;
    MemberListLoaded = false;

    /**
     * @param {any[]} groupMembers 
     */
    constructor(groupMembers = []) {
        this.MemberList = groupMembers;
    }
}