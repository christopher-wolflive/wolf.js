const Socket = require('../Socket');

/**
 * Singleton Packet Templates relating to Authorization Requests
 */
module.exports = class AuthRequests {

    /**
     * Login to WOLF with the given WOLF Account Credentials
     * @param {Socket} socket the socket to send this request through
     * @param {string} email the email of the account
     * @param {string} password the password of the account
     * @param {number} onlineState the onlineState to use when logging in
     */
    static Login = async (socket, email, password, onlineState = 1) => await socket.Emit('security login', { username: email, password, onlineState, type: 'email' });

    /**
     * Logout from the associated WOLF Account
     * @param {Socket} socket the socket to send this request through 
     */
    static Logout = async (socket) => await socket.Emit('security logout');
}