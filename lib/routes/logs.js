// Load modules

var Boom = require('boom');


exports.get = {
    description: 'Get all logs',
    handler: function (request, reply) {

        this.getLogs(function (err, logs) {

            if (err) {
                return reply(Boom.internal(err));
            }

            if (!logs) {
                return reply(Boom.notFound());
            }

            reply(logs);
        });
    }
};

