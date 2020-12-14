module.exports = class Message {
    Id = '';
    Recipient = -1;
    Originator = -1;
    IsGroup = false;
    Timestamp = 0;
    MimeType = '';
    Data = new ArrayBuffer();
    FlightId = '';
    Content = '';

    /**
     * 
     * @param {any} data
     */
    constructor(data) {
        let keys = Object.keys(this).reduce((keys, key) => { keys[key.toLowerCase()] = key; return keys; }, {});
        Object.keys(data).forEach(key => this[keys[key.toLowerCase()] ?? key] = data[key]);
        this.Content = this.Data.toString('utf8');
    }
}