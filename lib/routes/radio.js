// Load modules

var Boom = require('boom');
var Joi = require('joi');


exports.get = {
    description: 'Return a radio',
    validate: {
        params: {
            radioId: Joi.number().required().description('Id for the radio')
        }
    },
    handler: function (request, reply) {

        request.server.app.data.getRadio(request.params.radioId, function (err, radio) {

            return err ? reply(err) : reply(radio);
        });
    }
};


exports.update = {
    description: 'Update a radio',
    validate: {
        params: {
            radioId: Joi.number().required().description('id of radio')
        },
        payload: {
            name: Joi.number().optional().description('name of radio gateway'),
            version: Joi.string().alphanum().optional().description('version of radio hardware'),
            battery: Joi.string().alphanum().optional().description('battery percentage')
        }
    },
    handler: function (request, reply) {

        var radio = {
            name: request.payload.name,
            version: request.payload.version,
            battery: request.payload.battery
        };

        request.server.app.data.updateRadio(request.params.radioId, radio, function (err, result) {

            return err ? reply(Boom.internal(err)) : reply(result);
        });
    }
};
