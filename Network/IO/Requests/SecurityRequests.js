const IO = require('../IO');

/**
 * Packet Templates Regarding Security Requests
 */
module.exports = class SecurityRequests {
    /**
     * Login to WOLF with the given credentials
     * @param {IO} io the socket.io client to route this through
     * @param {string} email the email of the account
     * @param {string} password the password of the account
     * @param {number} onlineState the onlineState
     */
    static SecurityLogin = async (io, email, password, onlineState = 1) => await io.Emit('security login', {
        headers: { version: 2 },
        body: { username: email, password, onlineState, type: 'email' }
    });

    /**
     * Logout from WOLF
     * @param {IO} io the socket.io client to route this through
     */
    static SecurityLogout = async (io) => await io.Emit('security logout');

    /**
     * Refresh the Security Token
     * @param {IO} io the socket.io client to route this through
     */
    static SecurityTokenRefresh = async (io) => await io.Emit('security token refresh');
}