// Load modules

var Hoek = require('hoek');
var Mongo = require('mongodb');


// Shortcuts

var MongoClient = Mongo.MongoClient;


// Declare internals

var internals = {
    defaults: {
        host: '127.0.0.1',
        port: '27017',
        db: 'sensorDb'
    }
};


module.exports = internals.Data = function (options) {

    this.settings = Hoek.applyToDefaults(internals.defaults, options || {});
};


internals.Data.prototype.start = function (callback) {

    var self = this;

    MongoClient.connect('mongodb://' + this.settings.host + ':' + this.settings.port + '/' + this.settings.db, function (err, db) {

        if (err) {
            return callback(err);
        }

        self._db = db;
        self._radios = db.collection('radios');
        self._logs = db.collection('logs');

        return callback();
    });
};


internals.Data.prototype.getRadio = function (id, callback) {

    this._radios.findOne({ id: id }, callback);
};


internals.Data.prototype.getRadios = function (callback) {

    this._radios.find().toArray(callback);
};


internals.Data.prototype.updateRadio = function (id, radio, callback) {

    var self = this;

    this.getRadio(id, function (err, result) {

        // ignore err, can happen if radio doesn't exist
        if (result) {
            Hoek.merge(result, radio);
            radio = result;
        }

        radio.id = id;

        self._radios.update({ id: id }, radio, { upsert: true }, callback);
    });
};


internals.Data.prototype.saveReading = function (radioId, sensorId, reading, callback) {

    var self = this;

    if (!radioId) {
        return callback(new Error('Need Id'));
    }

    this.getRadio(radioId, function (err, radio) {

        // ignore err, can happen if radio doesn't exist
        if (!radio) {
            radio = {};
        }

        radio.sensors = radio.sensors || {};
        radio.sensors[sensorId] = radio.sensors[sensorId] || { readings: [] };
        radio.sensors[sensorId].readings.push(reading);

        self.updateRadio(radioId, radio, callback);
    });
};


internals.Data.prototype.updateSensor = function (radioId, sensorId, sensor, callback) {

    var self = this;

    this.getRadio(radioId, function (err, radio) {

        // ignore err, can happen if radio doesn't exist
        if (!radio) {
            radio = {};
        }

        radio.sensors = radio.sensors || {};
        radio.sensors[sensorId] = radio.sensors[sensorId] || { readings: [] };
        if (sensor.type) {
            radio.sensors[sensorId].type = sensor.type;
        }

        if (sensor.name) {
            radio.sensors[sensorId].name = sensor.name;
        }

        self.updateRadio(radioId, radio, callback);
    });
};


internals.Data.prototype.getSensor = function (radioId, sensorId, callback) {

    this.getRadio(radioId, function (err, radio) {

        if (!radio) {
            return callback(new Error('Radio ' + radioId + ' not found'));
        }

        var sensor = radio.sensors && radio.sensors[sensorId];
        if (!sensor) {
            return callback(new Error('Sensor ' + sensorId + ' not found'));
        }

        return callback(null, sensor);
    });
};


internals.Data.prototype.addCommand = function (command, callback) {

    db.collection('commands').insert(command, callback);
};


internals.Data.prototype.getCommands = function (callback) {

    db.collection('commands').find().toArray(function (err, commands) {

        if (err) {
            return callback(err);
        }

        db.collection('commands').drop(function (err) {

            callback(err, commands);
        });
    });
};


internals.Data.prototype.addLog = function (log, callback) {

    this._logs.insert(log, callback);
};
