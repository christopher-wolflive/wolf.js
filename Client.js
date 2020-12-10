const { GenerateToken, entityInCache, entitiesInCache, updateValues } = require('./Constants');
const Events = require('./Helpers/Events');
const { Socket } = require('./Network');
const User = require('./Models/User');
const Group = require('./Models/Group');
const Message = require('./Models/Message');
const { HandleLoginSuccess, HandleReconnected } = require('./Handlers');

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

        HandleLoginSuccess(this);
        HandleReconnected(this);

        this.Socket.HandleSocketEvents(this);
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