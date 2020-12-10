const Bot = require('../Bot');
const Group = require('../Models/Group');
const CommandContext = require('../Commands/CommandContext');
const FailedCommand = require('../Models/FailedCommand');

/**
 * 
 * @param {Bot} bot 
 */
module.exports = async bot => {
    bot.On.MessageRecieved = async mesg => {
        try {
            let command = bot.Commands
                .sort((a, b) => b.Trigger.length - a.Trigger.length)
                .filter(t => mesg.Content.toLowerCase().startsWith(t.Trigger.toLowerCase()))[0];
        
            if (!command)
                return;
            
            let user = await bot.GetUser(mesg.Originator);
            let group = mesg.IsGroup ? await bot.GetGroup(mesg.Recipient) : new Group({});
            let remainder = mesg.Content.substring(command.Trigger.length).trim();
            let context = new CommandContext(bot, mesg, user, group, remainder);
            
            let gml = [];
            
            if (command.RequiredRole != 0)
                gml = context.Group.MemberListLoaded ? context.Group.MemberList : await context.Client.GetGroupMemberList(context.Group.Id);
            
            let gmc = gml.find(t => t.Id === context.User.Id)?.Capabilities ?? 0;

            let isOwner = [32].includes(gmc);
            let isAdmin = [32, 1].includes(gmc);
            let isMod = [32, 1, 2].includes(gmc);

            if (command.RequiredRole === 32 && !isOwner) {
                bot.On.EE.emit('failed command', new FailedCommand(mesg, group, user, command.RequiredRole, command.Trigger));
                return;
            }

            if (command.RequiredRole === 1 && !isAdmin) {
                bot.On.EE.emit('failed command', new FailedCommand(mesg, group, user, command.RequiredRole, command.Trigger));
                return;
            }

            if (command.RequiredRole === 2 && !isMod) {
                bot.On.EE.emit('failed command', new FailedCommand(mesg, group, user, command.RequiredRole, command.Trigger));
                return;
            }
        
            if (command.Both)
                command.Both(context);
            else if (mesg.IsGroup && command.Group)
                command.Group(context);
            else if (!mesg.IsGroup && command.Private)
                command.Private(context);
        } catch (err) { console.log(err);}
    }
}