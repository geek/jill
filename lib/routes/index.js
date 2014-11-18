// Load modules

var Command = require('./command');
var Log = require('./log');
var Radio = require('./radio');
var Radios = require('./radios');
var Sensor = require('./sensor');


module.exports = [
    { path: '/radios', method: 'GET', config: Radios.get },

    { path: '/radio/{radioId}', method: 'GET', config: Radio.get },
    { path: '/radio/{radioId}', method: 'PATCH', config: Radio.update },

    { path: '/radio/{radioId}/sensor/{sensorId}', method: 'GET', config: Sensor.get },
    { path: '/radio/{radioId}/sensor/{sensorId}', method: 'PATCH', config: Sensor.update },
    { path: '/radio/{radioId}/sensor/{sensorId}/reading', method: 'POST', config: Sensor.createReading },
    { path: '/radio/{radioId}/sensor/{sensorId}/command', method: 'POST', config: Sensor.createCommand },

    { path: '/command', method: 'GET', config: Command.get },
    { path: '/log', method: 'POST', config: Log.create }
];
