class StatsTrendsHour {

    /**
     * @type {number}
     */
    Hour;

    /**
     * @type {number}
     */
    LineCount;
}

class StatsTrendsDay {
    
    /**
     * @type {number}
     */
    Day;
    
    /**
     * @type {number}
     */
    LineCount
}

class StatsTrendsDate {
    
    /**
     * @type {string}
     */
    Date;
    
    /**
     * @type {number}
     */
    LineCount;
}

module.exports = {
    StatsTrendsDate,
    StatsTrendsDay,
    StatsTrendsHour
}