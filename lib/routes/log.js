// Load modules

var Boom = require('boom');
var Joi = require('joi');


exports.create = {
	description: 'Log messages posted from the client with a time',
	validate: {
		payload: {
			message: Joi.string().required().description('The message to post'),
			time: Joi.date().optional().description('Time of the message'),
            boardId: Joi.number().optional().description('Board ID that created the message')
		}
	},
	handler: function (request, reply) {

        var log = {
            message: request.payload.message,
            time: request.payload.time || Date.now()
        };

        if (request.payload.boardId !== undefined) {
            log.boardId = request.payload.boardId;
        }

        this.addLog(log, function (err, result) {

            if (err) {
                return reply(Boom.internal(err));
            }

            reply(result).created('/log/' + result._id);
        });
	}
};


exports.get = {
    description: 'Get a single log message by Id',
    validate: {
        params: {
            logId: Joi.string().required().description('Log ID')
        }
    },
    handler: function (request, reply) {

        this.getLog(request.params.logId, function (err, log) {

            if (err) {
                return reply(Boom.internal(err));
            }

            if (!log) {
                return reply(Boom.notFound());
            }

            reply(log);
        });
    }
};
