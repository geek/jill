// Load modules

var Joi = require('joi');


exports.update = {
    description: 'Update meta-data about an addon',
    validate: {
        params: {
            boardId: Joi.number().required().description('Board ID'),
            addonId: Joi.number().required().description('Addon ID')
        },
        payload: {
            type: Joi.string().alphanum().optional().description('addon type'),
            name: Joi.string().alphanum().optional().description('addon name')
        }
    },
    handler: function (request, reply) {

        var addon = {
            type: request.payload.type,
            name: request.payload.name
        };

        this.updateAddon(request.params.boardId, request.params.addonId, addon, function (err, data) {

            return reply(err || data);
        });
    }
};

exports.get = {
    description: 'Get an addon by ID',
    validate: {
        params: {
            boardId: Joi.number().required().description('Board ID'),
            addonId: Joi.number().required().description('Addon ID')
        }
    },
    handler: function (request, reply) {

        this.getAddon(request.params.boardId, request.params.addonId, function (err, addon) {

            return reply(err || addon);
        });
    }
};


exports.createCommand = {
    description: 'Send a command to a board and addon',
    validate: {
        params: {
            boardId: Joi.number().required().description('Board ID'),
            addonId: Joi.number().required().description('Addon ID')
        },
        payload: {
            value: Joi.any().required().description('Value of command to be sent to the addon')
        }
    },
    handler: function (request, reply) {

        var boardId = request.params.boardId;
        var addonId = request.params.addonId;

        var command = {
            id: boardId,
            childId: addonId,
            type: 'set',
            ack: false,
            subType: 'V_LIGHT',
            payload: request.payload.value
        };

        this.addCommand(command, function (err, data) {

            return reply(err || data);
        });
    }
};


exports.createReading = {
    description: 'Create a reading from a board addon',
    validate: {
        params: {
            boardId: Joi.number().required().description('Board ID'),
            addonId: Joi.number().required().description('Addon ID')
        }
    },
    handler: function (request, reply) {

        var reading = {
            type: request.payload.type,
            value: request.payload.value,
            time: request.payload.time
        };

        this.saveReading(request.params.boardId, request.params.addonId, reading, function (err, result) {

            return reply(err || result);
        });
    }
};
