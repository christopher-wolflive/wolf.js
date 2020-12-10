const { AssignValues } = require('../Constants');
const CommandContext = require('./CommandContext');

module.exports = class Command {
    Trigger = '';
    Group = null;
    Private = null;
    Both = null;
    SubCommands = [];

    /**
     * 
     * @param {string} trigger 
     * @param {{ group?: (context: CommandContext) => void, private?: (context: CommandContext) => void, both?: (context: CommandContext) => void}} config
     * @param  {...Command} subcommands 
     */
    constructor(trigger, config, ...subcommands) {
        this.Trigger = trigger;
        this.SubCommands = subcommands;
        config && AssignValues(this, config);
    }
}