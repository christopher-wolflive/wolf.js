class SubscriberAdditionalInfo {
    
    /**
     * @type {string}
     */
    Hash;
    
    /**
     * @type {string}
     */
    NicknameShort;
    
    /**
     * @type {number}
     */
    Privileges
}

class SubscriberGenericSubscriber {

    /**
     * @type {number}
     */
    Id;

    /**
     * @type {SubscriberAdditionalInfo}
     */
    AdditionalInfo = new SubscriberAdditionalInfo;
}

module.exports = {
    SubscriberAdditionalInfo,
    SubscriberGenericSubscriber
}