const Client = require('../Client');
const { entityInCache, updateValues } = require('../Constants');

/**
 * 
 * @param {Client} client 
 */
module.exports = async client => {
    client.Socket.IO.on('subscriber update', async data => {
        const { id, hash } = data.body;

        let user = entityInCache(client.Users, 'Id', id);

        if (!user.cached)
            return client.GetUser(id);
        
        if (user.value['Hash'] === hash)
            return;
        
        let updatedUser = await client.Socket.RequestUserById(id);

        updateValues(client.Users, 'Id', id, updatedUser);
    });
}