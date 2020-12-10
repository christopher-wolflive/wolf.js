const { GenerateToken, entityInCache, entitiesInCache, updateValues } = require('./Constants');
const { Events } = require('./Helpers');
const { Socket } = require('./Network');
const { User } = require('./Models');

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
     * @param {any[]} groupCache 
     */
    constructor(userCache = [], groupCache = []) {
        this.Users = userCache;
        this.Groups = groupCache;
        this.Token = GenerateToken(1024);
        this.Socket = new Socket(this);
        this.On = new Events(this);
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
        
        try {
            let fetchedGroup = await this.Socket.RequestGroupById(id);
            console.log(fetchedGroup);
        } catch {
            return null;
        }
    }

    /**
     * Get Groups By ID
     * @param {...number} ids
     */
    GetGroups = async (...ids) => {
        let serach = entitiesInCache(this.Groups, 'Id', id);
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
}

module.exports = Client;