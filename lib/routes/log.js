// Load modules

var Boom = require('boom');
var Joi = require('joi');


exports.create = {
	description: 'Log messages posted from the client with a time',
	validate: {
		payload: {
			message: Joi.string().required().description('The message to post'),
			time: Joi.date().optional().description('Time of the message')
		}
	},
	handler: function (request, reply) {

        var log = {
            message: request.payload.message,
            time: request.payload.time || Date.now()
        };

        request.server.app.data.addLog(log, function (err, result) {

            if (err) {
                return reply(Boom.internal(err));
            }

            reply(result).created('/log/' + result._id);
        });
	}
};
