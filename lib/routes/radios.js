// Load modules

var Boom = require('boom');


exports.get = {
    description: 'Get all available reporting radios',
    handler: function (request, reply) {

        request.server.pack.app.data.getRadios(function (err, radios) {

            return err ? reply(Boom.internal(err)) : reply(radios);
        });
    }
};
