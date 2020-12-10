const Client = require('../Client');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.On.Reconnected = async () => {
        // Subscribe to Messages
        await client.Socket.Request('message group subscribe');
        await client.Socket.Request('message private subscribe');

        // Resubscribe to fetched users
        await client.Socket.RequestUsersById(...client.Users.map(t => t.Id));

        // Resubscribe to Fetched Groups
        await client.Socket.RequestGroupsById(...client.Groups.map(t => t.Id));
    }
}