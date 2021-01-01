module.exports = class SubscriberBuilder {
    /**
     * @type {any}
     */
    Data;

    constructor() {
        this.Data = {};
    }

    #AddOrUpdate = (key, item, extended = false) => {
        if (extended && !this.Data.extended)
            this.Data.extended = {};
        
        (extended ? this.Data.extended : this.Data)[key] = item;

        return this;
    }

    /**
     * Set the name for the group (Group Create Only!)
     * @param {string} name the name of the group 
     */
    Name = (name) => this.#AddOrUpdate('name', name);

    /**
     * Set the description for the group
     * @param {string} description the description of the group
     */
    Description = (description) => this.#AddOrUpdate('description', description);

    /**
     * Set the peekable status of the group
     * @param {boolean} peekable rather thsi group can be peeked without being a member
     */
    Peekable = (peekable) => this.#AddOrUpdate('peekable', peekable);

    /**
     * Set the password for a group (Group Update Only!)
     * @param {string} password the password to set
     */
    Password = (password) => this.#AddOrUpdate('password', password);

    /**
     * Set the long description of a group
     * @param {string} longDescription the long description of the group
     */
    LongDescription = (longDescription) => this.#AddOrUpdate('longDescription', longDescription, true);

    /**
     * Set the discoverable status for the group
     * @param {boolean} discoverable rather this group shows up in discovery or not
     */
    Discoverable = (discoverable) => this.#AddOrUpdate('discoverable', discoverable, true);

    /**
     * Set the advanced admin status for the group
     * @param {boolean} advancedAdmin rather admins can grant or revoke admin privileges for other members
     */
    AdvancedAdmin = (advancedAdmin) => this.#AddOrUpdate('advancedAdmin', advancedAdmin, true);

    /**
     * Set the language for the group
     * @param {number} language the langauge of the group 
     */
    Language = (language) => this.#AddOrUpdate('language', language, true);

    /**
     * Set the category for the group
     * @param {number} category the category for the group
     */
    Category = (category) => this.#AddOrUpdate('category', category, true);

    /**
     * Set the entry level for the group
     * @param {number} entryLevel the required reputation level to join the group
     */
    EntryLevel = (entryLevel) => this.#AddOrUpdate('entryLevel', entryLevel, true);

    /**
     * @returns {any}
     */
    Done = () => this.Data;
}