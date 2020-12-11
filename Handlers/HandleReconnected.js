const Client = require('../Client');
const { updateValues } = require('../Constants/CacheUtils');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.On.Reconnected = async () => {
        await client.Socket.Request('message group subscribe');
        await client.Socket.Request('message private subscribe');

        // Resubscribe to fetched users
        await client.Socket.RequestUsersById(client.Users.map(t => t.Id));

        // Resubscribe to Fetched Groups
        await client.Socket.RequestGroupsById(client.Groups.map(t => t.Id));

        // Resubscribe to Group Member Lists
        let mlLoaded = client.Groups.filter(t => t.MemberListLoaded).map(t => t.Id);

        for (let i = 0; i < mlLoaded; i++)
            try {
                await client.Socket.RequestGroupMemberList(mlLoaded[i]);
            } catch (err) { 
                updateValues(client.Groups, 'Id', mlLoaded[i], { MemberList: [], MemberListLoaded: false });
            }
    }
}