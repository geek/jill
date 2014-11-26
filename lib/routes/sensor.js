// Load modules

var Joi = require('joi');


exports.update = {
    description: 'Update meta-data about a sensor',
    validate: {
        params: {
            radioId: Joi.number().required().description('Radio ID'),
            sensorId: Joi.number().required().description('Sensor ID')
        },
        payload: {
            type: Joi.string().alphanum().optional().description('new type for this sensor'),
            name: Joi.string().alphanum().optional().description('new name for this sensor')
        }
    },
    handler: function (request, reply) {

        var sensor = {
            type: request.payload.type,
            name: request.payload.name
        };

        this.updateSensor(request.params.radioId, request.params.sensorId, sensor, function (err, data) {

            return err ? reply(err) : reply(data);
        });
    }
};

exports.get = {
    description: 'Get a sensor by ID',
    validate: {
        params: {
            radioId: Joi.number().required().description('Radio ID'),
            sensorId: Joi.number().required().description('Sensor ID')
        }
    },
    handler: function (request, reply) {

        this.getSensor(request.params.radioId, request.params.sensorId, function (err, data) {

            return err ? reply(err) : reply(data);
        });
    }
};


exports.createCommand = {
    description: 'Send a command to an eligible radio unit',
    validate: {
        params: {
            radioId: Joi.number().required().description('ID of the radio unit'),
            sensorId: Joi.number().required().description('ID of the unit on the radio to command')
        },
        payload: {
            value: Joi.any().required().description('Value of command to be sent to the sensor')
        }
    },
    handler: function (request, reply) {

        var radioId = request.params.radioId;
        var sensorId = request.params.sensorId;

        var command = {
            id: radioId,
            childId: sensorId,
            type: 'set',
            ack: false,
            subType: 'V_LIGHT',
            payload: request.payload.value
        };

        this.addCommand(command, function (err, data) {

            return err ? reply(err) : reply(data);
        });
    }
};


exports.createReading = {
    description: 'Add a reading to a particular child on a radio',
    validate: {
        params: {
            radioId: Joi.number().required().description('Radio ID'),
            sensorId: Joi.number().required().description('Sensor ID')
        }
    },
    handler: function (request, reply) {

        var reading = {
            type: request.payload.type,
            value: request.payload.value,
            time: request.payload.time
        };

        this.saveReading(request.params.radioId, request.params.sensorId, reading, function (err, response) {

            return err ? reply(err) : reply(response);
        });
    }
};
