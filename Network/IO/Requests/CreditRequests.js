const IO = require('../IO');

module.exports = class CreditRequests {

    /**
     * Get the current subscriber's credit balance
     * @param {IO} io the socket.io client to send this request through
     * @param {boolean} subscribe subscribe to credit balance updates
     */
    StoreCreditBalance = async (io, subscribe = false) => await io.Emit('store credit balance', { subscribe });

}