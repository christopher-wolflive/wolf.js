module.exports = class SubscriberBuilder {
    /**
     * @type {{nickname?: string, status?: string, extended?: { name?: string, about?: string, gender?: number, lookingFor?: number, relationship?: number, langugae?: number, urls?: string[], dateOfBirth?: number}}}
     */
    Data;

    constructor() {
        this.Data = {};
    }

    #AddOrUpdate = (key, value, extended = false) => {
        if (extended && !this.Data.extended)
            this.Data.extended = {};
        
        if (extended)
            this.Data.extended = { ...this.Data.extended, [key]: value };
        else
            this.Data = { ...this.Data, [key]: value };
        
        return this;
    }
    /**
     * Update the subscriber's nickname
     * @param {string} nickname 
     */
    Nickname = (nickname) => this.#AddOrUpdate('nickname', nickname);

    /**
     * 
     * @param {string} status 
     */
    Status = (status) => this.#AddOrUpdate('status', status);

    /**
     * 
     * @param {string} name 
     */
    Name = (name) => this.#AddOrUpdate('name', name, true);

    /**
     * 
     * @param {string} about 
     */
    About = (about) => this.#AddOrUpdate('about', about, true);

    /**
     * 
     * @param {number} gender 
     */
    Gender = (gender) => this.#AddOrUpdate('gender', gender, true);

    /**
     * 
     * @param {number} lookingFor 
     */
    LookingFor = (lookingFor) => this.#AddOrUpdate('lookingFor', lookingFor, true);

    /**
     * 
     * @param {number} relationship 
     */
    Relationship = (relationship) => this.#AddOrUpdate('relationship', relationship, true);

    /**
     * 
     * @param {number} langugae 
     */
    Language = (langugae) => this.#AddOrUpdate('language', langugae, true);

    /**
     * 
     * @param {number} urls 
     */
    URLs = (urls) => this.#AddOrUpdate('urls', urls, true);

    /**
     * 
     * @param {number} dateOfBirth 
     */
    DateOfBirth = (dateOfBirth) => this.#AddOrUpdate('dateOfBirth', dateOfBirth, true);

    /**
     * @returns {{nickname?: string, status?: string, extended?: { name?: string, about?: string, gender?: number, lookingFor?: number, relationship?: number, langugae?: number, urls?: string[], dateOfBirth?: number}}}
     */
    Done = () => this.Data;
}