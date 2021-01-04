class Charm {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {string}
     */
    Name;
    
    /**
     * @type {string}
     */
    Description;
    
    /**
     * @type {number}
     */
    ProductId;
    
    /**
     * @type {string}
     */
    ImageUrl;
}

class StarredCharm {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {number}
     */
    Cost;
}

class SubscriberCharm {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {number}
     */
    CharmId;
    
    /**
     * @type {number}
     */
    SubscriberId;
    
    /**
     * @type {number}
     */
    SourceSubscriberId;
    
    /**
     * @type {string}
     */
    ExpireTime;
}

class SelectedCharm {
    
    /**
     * @type {number}
     */
    ActiveCharmId;
    
    /**
     * @type {number}
     */
    CharmId;
    
    /**
     * @type {number}
     */
    Position;
}

class ProductLine {
    
    /**
     * @type {number}
     */
    Id;

    /**
     * @type {string}
     */
    Name;
}

class CharmSubscriberStatistics {
    
    /**
     * @type {number}
     */
    TotalReceived;
    
    /**
     * @type {number}
     */
    TotalGifted;
    
    /**
     * @type {number}
     */
    TotalActive;
    
    /**
     * @type {number}
     */
    TotalExpired;
}

module.exports = {
    Charm,
    StarredCharm,
    SelectedCharm,
    SubscriberCharm,
    ProductLine,
    CharmSubscriberStatistics
}