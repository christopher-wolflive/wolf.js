const Client = require('../Client');
const IManager = require('./IManager');
const User = require('../Models/User/User');
const UserExtended = require('../Models/User/UserExtended');

module.exports = class UserManager extends IManager {
    #Client;

    /**
     * Create a new User Manager
     * @param {Client} client 
     */
    constructor(client) {
        super();
        this.IdKey = 'Id';
        this.#Client = client;

        this.#Client.Socket.On('subscriber update', this.#SubscriberUpdate);
    }

    /**
     * @param {number} userId 
     * @returns {User}
     */
    GetUser = async (id) => {
        let user = this.GetEntity(id);

        if (user)
            return user;
        
        user = await this.#RequestUser(id);

        if (!user)
            return null;
        
        this.AddEntities(user);
        return user;
    }

    /**
     * @param  {...number} ids 
     * @returns {User[]}
     */
    GetUsers = async (...ids) => {
        let users = this.GetEntities(...ids);
        let usersIds = users.map(user => user[this.IdKey]);
        
        ids = ids.filter(id => !usersIds.includes(id));
        let fUsers = await this.#RequestUsers(...ids);

        this.AddEntities(...fUsers);
        users.push(...fUsers);

        return users;
    }

    //#region Event Binders

    #SubscriberUpdate = async data => {
        const { id, hash } = data.body;

        let user = this.GetUser(id);

        if (user.Hash === hash)
            return;
        
        this.UpdateEntity(id, this.#RequestUser(id));
    }

    //#endregion

    //#region Data Requestors

    /**
     * 
     * @param {number} id 
     * @returns {User}
     */
    #RequestUser = async id => {
        try {
            let resp = await this.#Client.Socket.Request('subscriber profile', {
                headers: { version: 4 },
                body: {
                    id,
                    extended: true,
                    subscribe: true
                }
            });

            return this.#GenerateUser(resp);
        } catch { return null; }
    }

    /**
     * 
     * @param {...number} id 
     */
    #RequestUsers = async (...ids) => {
        let users = [];
        let chunkSize = 50;

        for (let i = 0; i < ids.length; i += chunkSize) {
            try {
                let resp = await this.#Client.Socket.Request('subscriber profile', {
                    headers: { version: 4 },
                    body: {
                        idList: ids.slice(i, i + chunkSize),
                        extended: true,
                        subscribe: true
                    }
                });

                let fUsers = Object.values(resp).filter(t => t.code === 200).map(t => this.#GenerateUser(t.body));
                users.push(...fUsers);
            } catch (err) { }
        }

        return users;
    }

    //#region Data Processors

    /**
     * 
     * @param {any} data 
     * @returns {User}
     */
    #GenerateUser = data => {
        data['extended'] = this.FillValues(new UserExtended(), data['extended'] ?? {});
        return this.FillValues(new User(), data);
    }

    //#endregion
}