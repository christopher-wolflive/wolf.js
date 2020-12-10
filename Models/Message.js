const { AssignValues } = require('../Constants');

module.exports = class Message {
    Id = '';
    Recipient = -1;
    Originator = -1;
    IsGroup = false;
    Timestamp = 0;
    MimeType = '';
    Data = new ArrayBuffer();
    Content = '';
    FlightId = '';

    constructor(obj) {
        obj && AssignValues(this, obj);
        this.Content = this.Data.toString('utf8');
    }
}