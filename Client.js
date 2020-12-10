const { GenerateToken, entityInCache, entitiesInCache, updateValues } = require('./Constants');
const { Events } = require('./Helpers');
const { Socket } = require('./Network');
const { User, Group, Message } = require('./Models');

class Client {
    Groups;
    Users;
    CurrenUser = new User({});
    Token;
    Socket;
    On;

    /**
     * 
     * @param {User[]} userCache 
     * @param {Group[]} groupCache 
     */
    constructor(userCache = [], groupCache = []) {
        this.Users = userCache;
        this.Groups = groupCache;
        this.Token = GenerateToken(1024);
        this.Socket = new Socket(this);
        this.On = new Events(this);

        this.On.LoginSuccess = async (user) => {
            // Subscribe to Messages
            await this.Socket.RequestSubscribeToMessages('group');
            await this.Socket.RequestSubscribeToMessages('private');

            // Get Contacts
            let contacts = await this.Socket.RequestSubscriberTypeList('contact');
            await this.GetUsers(...contacts.map(t => t['id']));

            // Get Groups
            let groups = await this.Socket.RequestSubscriberTypeList('group');
            await this.GetGroups(...groups.map(t => t['id']));
        }

        this.On.Reconnected = async () => {
            // Resubscribe to Message
            await this.Socket.RequestSubscribeToMessages('group');
            await this.Socket.RequestSubscribeToMessages('private');

            // Resubscribe to Fetched Users
            await this.GetUsers(...this.Users.map(t => t.Id));

            // Resubscribe to Fetched Groups
            await this.GetGroups(...this.Groups.map(t => t.Id));
        }

        this.Socket.IO.on('message send', (data) => {
            let mesg = new Message(data.body);
            
            // Process Group Admin Actions
            if (mesg.MimeType === 'application/palringo_group_action') {
                return;
            }

            this.On.EE.emit('message send', mesg);
        });

        this.Socket.IO.on('subscriber update', async (data) => {
            console.log(data);
            const { id, hash } = data.body;

            let user = entityInCache(this.Users, 'Id', id);

            if (!user.cached)
                return this.GetUser(id);

            if (user.value['Hash'] === hash)
                return;

            let updatedUser = await this.Socket.RequestUserById(id);

            updateValues(this.Users, 'Id', id, updatedUser);
        });

        this.Socket.IO.on('group update', async (data) => {
            console.log(data);
            const { id, hash } = data.body;

            let group = entityInCache(this.Groups, 'Id', id);

            if (!group.cached)
                return this.GetGroup(id);

            if (group.value['Hash'] === hash)
                return;

            let updatedGroup = new Group(await this.Socket.RequestGroupById(id));

            updateValues(this.Groups, 'Id', id, updatedGroup);
        });
    }

    /**
     * Login to WOLF
     * @param {string} email 
     * @param {string} password 
     * @param {1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9} deviceTypeId
     */
    Login = async (email, password, deviceTypeId = 8) => {
        try {
            let loginResp = await this.Socket.RequestLogin(email, password, deviceTypeId);
            this.CurrenUser = await this.GetUser(loginResp['id']);
            this.On.EE.emit('security login success', this.CurrenUser);
        } catch {
            this.On.EE.emit('security login failed');
        }
    }

    /**
     * Logout from WOLF
     */
    Logout = async () => {
        try {
            await this.Socket.RequestLogout();
            this.CurrenUser = new User({});
            this.On.EE.emit('security logout success');
        } catch {
            this.On.EE.emit('security logout failed')
        }
    }

    /**
     * Get Groups By ID
     * @param {number} id 
     */
    GetGroup = async (id) => {
        let search = entityInCache(this.Groups, 'Id', id);

        if (search.cached)
            return search.value;
        
        let group = new Group(await this.Socket.RequestGroupById(id));
        this.Groups.push(group);
        return group;
    }

    /**
     * Get Groups By ID
     * @param {...number} ids
     * @returns {Group[]}
     */
    GetGroups = async (...ids) => {
        let serach = entitiesInCache(this.Groups, 'Id', ids);
        let groups = serach.filter(t => t.cached).map(t => t.value);
        let uncached = serach.filter(t => !t.cached).map(t => t['id']);

        if (uncached.length > 0) {
            let fetched = await this.Socket.RequestGroupsById(uncached);
            let parsed = fetched.map(t => new Group(t));

            this.Groups.push(...parsed);
            
            groups.push(...parsed);
        }

        return groups;
    }

    /**
     * Get Groups By ID
     * @param {number} id
     */
    GetUser = async (id) => {
        let search = entityInCache(this.Users, 'Id', id);

        if (search.cached)
            return search.value;
        
        let user = new User(await this.Socket.RequestUserById(id));
        this.Users.push(user);
        return user;
    }

    /**
     * Get Groups By ID
     * @param {number} id
     * @returns {User[]}
     */
    GetUsers = async (...ids) => {
        let search = entitiesInCache(this.Users, 'Id', ids);
        let users = search.filter(t => t.cached).map(t => t.value);
        let uncached = search.filter(t => !t.cached).map(t => t['id']);

        if (uncached.length > 0) {
            let fetched = await this.Socket.RequestUsersById(uncached);
            let parsed = fetched.map(t => new User(t));

            this.Users.push(...parsed);

            users.push(...parsed);
        }

        return users;
    }

    /**
     * 
     * @param {number} id 
     * @param {any} content 
     * @param {boolean} isGroup 
     * @param {string} mimeType 
     */
    SendMessage = async (id, content, isGroup, mimeType = 'text/plain') => {
        return await this.Socket.RequestSendMessage(id, content, isGroup, mimeType);
    }
}

module.exports = Client;