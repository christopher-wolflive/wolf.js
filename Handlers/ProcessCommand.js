const Bot = require('../Bot');
const { Group } = require('../Models');
const { CommandContext } = require('../Commands');

/**
 * 
 * @param {Bot} bot 
 */
module.exports = async bot => {
    bot.On.MessageRecieved = async mesg => {
        let command = bot.Commands
            .sort((a, b) => b.Trigger.length - a.Trigger.length)
            .filter(t => mesg.Content.startsWith(t.Trigger))[0];
        
        if (!command)
            return;
        
        let user = await bot.GetUser(mesg.Originator);
        let group = mesg.IsGroup ? await bot.GetGroup(mesg.Recipient) : new Group({});
        let remainder = mesg.Content.substring(command.Trigger.length).trim();

        let context = new CommandContext(bot, mesg, user, group, remainder);
        
        if (command.Both)
            command.Both(context);
        else if (mesg.IsGroup && command.Group)
            command.Group(context);
        else if (!mesg.IsGroup && command.Private)
            command.Private(context);
    }
}