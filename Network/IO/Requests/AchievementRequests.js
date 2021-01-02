const IO = require('../IO');

module.exports = class AchievementRequests {
    static AchievementList = async (io, languageId = 1) => await io.Emit('achievement list', {languageId});
    
}