const { AssignValues } = require('../Constants');

class User {
    Id = -1;
    Hash = '';
    Privileges = 0;
    Nickname = '';
    Status = '';
    Reputation = 0.0;
    Icon = 0;
    OnlineState = 0;
    DeviceType = 0;
    GroupMemberCapabilities = null;
    ContactListBlockedState = null;
    ContactListAuthState = null;
    Charms = { SelectedList: [] };
    Extended = new UserExtended({});

    constructor(obj) {
        const { extended } = obj;
        obj && AssignValues(this, obj);

        if (extended)
            this.Extended = new UserExtended(extended);
    }
}

class UserExtended {
    Language = 0;
    Urls = [];
    LookingFor = 0;
    DateOfBirth = 0;
    Relationship = 0;
    Gender = 0;
    About = '';
    OptOut = null;
    UtfOffset = 0;
    Latitude = 0;
    Longitude = 0;
    Name1 = null;
    After = null;
    DobD = 0;
    DobM = 0;
    DobY = 0;
    RelationshipStatus = 0;
    Sex = 0;
    Name = null;

    constructor(obj) {
        obj && AssignValues(this, obj);
    }
}

module.exports = {
    User,
    UserExtended
}