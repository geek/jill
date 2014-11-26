

module.exports.get = {
    description: 'Get commands to send',
    handler: function (request, reply) {

        this.getCommands(function (err, commands) {

            return err ? reply(err) : reply(commands);
        });
    }
};
