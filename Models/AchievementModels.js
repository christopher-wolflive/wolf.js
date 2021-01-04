class Achievement {
    
    /**
     * @type {number}
     */
    Id;
    
    /**
     * @type {number}
     */
    ParentId;
    
    /**
     * @type {number[]}
     */
    ChildrenList;
    
    /**
     * @type {string}
     */
    Type;
    
    /**
     * @type {number}
     */
    TypeId;
    
    /**
     * @type {string}
     */
    Name;
    
    /**
     * @type {string}
     */
    Description;
    
    /**
     * @type {string}
     */
    ImageUrl;
    
    /**
     * @type {number}
     */
    CategoryId;
}

class AchievementCategory {

    /**
     * @type {number}
     */
    Id;

    /**
      * @type {string}
      */
    Name;
}

module.exports = { 
  Achievement,
  AchievementCategory
}