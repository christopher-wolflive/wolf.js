const Events = require('./Helpers/Events');
const Group = require('./Models/Group/Group');
const GroupManager = require('./Managers/GroupManager');
const GroupMember = require('./Models/GroupMember/GroupMember');
const GroupMessage = require('./Models/Message/GroupMessage');
const Message = require('./Models/Message/Message');
const Socket = require('./Network/Socket');
const User = require('./Models/User/User');
const UserManager = require('./Managers/UserManager');
const GroupRole = require('./Enums/GroupRole');
const GroupMemberUpdate = require('./Models/GroupMember/GroupMemberUpdate');
const Privileges = require('./Enums/Privileges');

module.exports = class Client {
    #Token;
    #GroupManager;
    #UserManager;
    CurrentUser = new User(-1);
    On;
    Socket;
    
    /**
     * Create a new Client
     * @param {string} token Use an existing token
     */
    constructor(token = null) {
        this.#Token = token ?? this.#GenerateToken(64);
        this.On = new Events(this);
        this.Socket = new Socket(this.#Token);
        this.#GroupManager = new GroupManager(this);
        this.#UserManager = new UserManager(this);

        this.On.Welcome = this.#OnWelcome;
        this.On.LoginSuccess = this.#OnLoginSuccess;
        this.Socket.On('message send', this.#OnMessage);
    }

    /**
     * Generate a Token
     * @param {number} length 
     * @returns {string}
     */
    #GenerateToken = length => {
        let d = new Date().getTime();
        return 'WolfJS' + 'x'.repeat(length).replace(/[x]/gi, c => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Login to WOLF with the provided credentials
     * @param {string} email 
     * @param {string} password 
     * @returns {boolean}
     */
    Login = async (email, password) => {
        try {
            let loginRes = await this.Socket.Request('security login', {
                username: email,
                password,
                deviceTypeId: 8
            });

            let user = await this.#HandleLoginData(loginRes);
            this.On.Emit('security login success', user);
            return true;
        } catch {
            this.On.Emit('security login failed');
            return false;
        }
    }

    /**
     * Get a User by ID
     * @param {number} id 
     * @returns {User}
     */
    GetUser = async (id) => {
        try {
            return await this.#UserManager.GetUser(id);
        } catch { return null; }
    }

    /**
     * Get Users by their ID
     * @param  {...number} ids 
     * @returns {User[]}
     */
    GetUsers = async (...ids) => {
        try {
            return await this.#UserManager.GetUsers(...ids);
        } catch { return []; }
    }

    /**
     * Get a Group by ID
     * @param  {number} id
     * @returns {Group};
     */
    GetGroup = async (id) => {
        try {
            return await this.#GroupManager.GetGroup(id);
        } catch { return null; }
    }

    /**
     * Get Groups by their ID
     * @param  {...number} ids
     * @returns {Group[]}
     */
    GetGroups = async (...ids) => {
        try { 
            return await this.#GroupManager.GetGroups(...ids);
        } catch { return []; }
    }

    SendMessage = async (id, content, isGroup = true, mimeType = 'text/plain') => {
        try {
            return await this.Socket.Request('message send', {
                recipient: id,
                isGroup,
                mimeType,
                data: content,
                flightId: `${this.CurrentUser.Id}_${id}_${new Date().getTime()}`
            });
        } catch (err) { return err; }
    }

    #RankGroupRole = role => {
        switch (role) {
            case GroupRole.Owner:
                return 3;
            case GroupRole.Admin:
                return 2;
            case GroupRole.Mod:
                return 1;
            default:
                return -1;
        }
    }

    /**
     * @param {GroupMessage} message 
     */
    DeleteMessage = async (message) => {
        try {
            if (!message.IsGroup)
                return false;
        
            // Fetch member list
            await this.GetGroupMemberList(message.Recipient.id);

            await this.Socket.Request('message update', {
                recipientId: message.Recipient.id,
                timestamp: message.Timestamp,
                isGroup: message.IsGroup,
                metadata: {
                    isDeleted: true
                }
            });

            return true;
        } catch (e) { console.log(e); return false; }
    }

    /**
     * 
     * @param {number} id 
     * @returns {GroupMember[]}
     */
    GetGroupMemberList = async (id) => {
        try {
            return await this.#GroupManager.GetGroupMemberList(id);
        } catch { return []; }
    }

    //#region Data Binders

    #OnWelcome = async welcomeData => {
        const { loggedInUser } = welcomeData;

        if (loggedInUser) {
            let user = await this.#HandleLoginData(loggedInUser);
            this.On.Emit('security login success', user);
        }
    }

    #OnLoginSuccess = async user => {
        // Subscribe to Messages
        await this.Socket.Request('message group subscribe', { headers: { version: 4 }});
        await this.Socket.Request('message private subscribe');

        // Fetch Contacts
        let contacts = await this.Socket.Request('subscriber contact list');
        await this.GetUsers(contacts.map(t => t.id));

        // Fetch Groups
        let groups = await this.Socket.Request('subscriber group list');
        await this.GetGroups(groups.map(t => t.id));

        // Emit Ready
        this.On.Emit('ready');
    }

    #ParseCapabilities = capabilities => {
        switch (capabilities) {
            case 'owner':
                return GroupRole.Owner;
            case 'admin':
                return GroupRole.Admin;
            case 'mod':
                return GroupRole.Mod;
            case 'reset':
                return GroupRole.User;
            case 'silence':
                return GroupRole.Silence;
            case 'kick':
                return GroupRole.Kick;
            case 'ban':
                return GroupRole.Ban;
            case 'join':
                return GroupRole.User;
            default:
                return -1;
        }
    }

    #OnMessage = async data => {
        if (data.body.recipient.id)
            data.body.recipient = data.body.recipient.id;
        
        if (data.body.originator.id)
            data.body.originator = data.body.originator.id;
        
        let mesg = new Message(data.body);

        this.On.Emit('message send', mesg);

        const { isGroup, originator, recipient } = data.body;

        if (!isGroup)
            return this.On.Emit('private message send', mesg);
        
        let group = await this.GetGroup(recipient);
        
        // Parse for admin actions
        if (mesg.MimeType === 'application/palringo-group-action' && !group.MemberListLoaded) {
            let groupId = recipient;
            let userId = originator;
            let user = await this.GetUser(userId);
            let capabilities = this.#ParseCapabilities(JSON.parse(data.body.data).type);

            this.On.Emit('group action', new GroupMemberUpdate(userId, user, groupId, group, capabilities));
        }
        
        // Do Some Parsing
        let gm = group?.MemberList?.find(t => t.Id === originator) ?? new GroupMember(originator, -1);

        return this.On.Emit('group message send', new GroupMessage(data.body, gm.Capabilities));
    }
    //#endregion

    //#region Data Processors

    /**
     * @param {any} loginData 
     * @returns {User}
     */
    #HandleLoginData = async loginData => {
        this.#GroupManager.ClearEntities();
        this.#UserManager.ClearEntities();

        const { id } = loginData;

        let user = await this.#UserManager.GetUser(id);

        this.CurrentUser = user;
        return user;
    }
    //#endregion
}