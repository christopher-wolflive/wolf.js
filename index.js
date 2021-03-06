const Client = require('./Client');
const Events = require('./Helpers/Events');
const Group = require('./Models/Group/Group');
const GroupAudioConfig = require('./Models/Group/GroupAudioConfig');
const GroupAudioCounts = require('./Models/Group/GroupAudioCounts');
const GroupManager = require('./Managers/GroupManager');
const GroupMember = require('./Models/GroupMember/GroupMember');
const GroupMessage = require('./Models/Message/GroupMessage');
const GroupRole = require('./Enums/GroupRole');
const Message = require('./Models/Message/Message');
const Privileges = require('./Enums/Privileges');
const Socket = require('./Network/Socket');
const User = require('./Models/User/User');
const UserExtended = require('./Models/User/UserExtended');
const UserManager = require('./Managers/UserManager');

module.exports = {
    Client,
    Events,
    Group,
    GroupAudioConfig,
    GroupAudioCounts,
    GroupManager,
    GroupMember,
    GroupMessage,
    GroupRole,
    Message,
    Privileges,
    Socket,
    User,
    UserExtended,
    UserManager
}