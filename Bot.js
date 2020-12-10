const Client = require('./Client');
const { Command, CommandContext } = require('./Commands');
const { Group } = require('./Models');

class Bot extends Client {
    Commands;

    constructor(userCache, groupCache) {
        super();
        this.Commands = [];

        this.On.MessageRecieved = async (mesg) => {
            let command = this.Commands
                .sort((a, b) => b.Trigger.length - a.Trigger.length)
                .filter(t => mesg.Content.startsWith(t.Trigger))[0];
            
            if (!command)
                return;
            
            let user = await this.GetUser(mesg.Originator);
            let group = await mesg.IsGroup ? this.GetGroup(mesg.Recipient) : new Group({});
            let remainder = mesg.Content.substring(command.Trigger.length).trim();

            let context = new CommandContext(this, mesg, user, group, remainder);

            if (command.Both)
                command.Both(context);
            else if (mesg.IsGroup && command.Group)
                command.Group(context);
            else if (!mesg.IsGroup && command.Private)
                command.Private(context);
        }
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