const { Permissions } = require('discord.js');

module.exports = {

    generateClientInvite: (client) => {

        return client.generateInvite({
            permissions: [Permissions.FLAGS.MODERATE_MEMBERS],
            scopes: ['bot', 'applications.commands'],
        });
        
    }
}
