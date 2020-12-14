module.exports = class GroupMember {
    Id = -1;
    Capabilities = -1;

    /**
     * 
     * @param {number} id 
     * @param {number} capabilities 
     */
    constructor(id, capabilities) {
        this.Id = id;
        this.Capabilities = capabilities;
    }
}