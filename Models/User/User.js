const UserExtended = require('./UserExtended');

module.exports = class User {
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
}