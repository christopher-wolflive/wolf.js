const { AssignValues } = require('../Constants');
const CommandContext = require('./CommandContext');
const GroupRole = require('../Enums/GroupRole');

module.exports = class Command {
    Trigger = '';
    Group = null;
    Private = null;
    Both = null;
    RequiredRole = GroupRole.User;
    SubCommands = [];

    /**
     * 
     * @param {string} trigger 
     * @param {{ group?: (context: CommandContext) => void, private?: (context: CommandContext) => void, both?: (context: CommandContext) => void, requiredRole?: GroupRole}} config
     * @param  {...Command} subcommands 
     */
    constructor(trigger, config, ...subcommands) {
        this.Trigger = trigger;
        this.SubCommands = subcommands;
        config && AssignValues(this, config);
    }
}