const Client = require('../Client');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.On.LoginSuccess = async user => {
        // Subscribe to Messages
        await client.Socket.Request('message group subscribe');
        await client.Socket.Request('message private subscribe');

        // Fetch and Subscribe to Contacts
        let contacts = await client.Socket.Request('subscriber contact list');
        await client.GetUsers(...contacts.map(t => t['id']));

        // Fetch and Subscribe to Groups
        let groups = await client.Socket.Request('subscriber group list');
        await client.GetGroups(...groups.map(t => t['id']));
    }
}