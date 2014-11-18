// Load modules

var Code = require('code');
var Hapi = require('hapi');
var Lab = require('lab');
var Jill = require('../');


// Declare internals

var internals = {};


// Test shortcuts

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;


describe('jill plugin', function () {

    it('can be registered in hapi', function (done) {

        var server = new Hapi.Server();
        server.pack.register(Jill, function (err) {

            expect(err).to.not.exist();
            done();
        });
    });
});
