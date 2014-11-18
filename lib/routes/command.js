

module.exports.get = {
    description: 'Get commands to send',
    handler: function (request, reply) {

        request.server.app.data.getCommands(function (err, commands) {

            return err ? reply(err) : reply(commands);
        });
    }
};
