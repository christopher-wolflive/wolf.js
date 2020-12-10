const Client = require('./Client');
const Command = require('./Commands/Command');
const { ProcessCommand } = require('./Handlers');

class Bot extends Client {
    Commands;

    constructor(userCache, groupCache) {
        super();
        this.Commands = [];

        ProcessCommand(this);
    }

    /**
     * 
     * @param  {...Command} commands 
     */
    AddCommands = (...commands) => {
        this._processCommands(null, ...commands);
    }

    /**
     * @param {string} prefix 
     * @param  {...Command} commands 
     */
    _processCommands(prefix, ...commands) {
        commands.forEach(cmd => {
            if (prefix)
                cmd.Trigger = `${prefix} ${cmd.Trigger}`;

            if (cmd.SubCommands.length > 0)
                this._processCommands(cmd.Trigger, ...cmd.SubCommands);

            this.Commands.push({
                Trigger: cmd.Trigger,
                Group: cmd.Group,
                Private: cmd.Private,
                Both: cmd.Both
            });
        });
    }
}

module.exports = Bot;