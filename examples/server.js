var Hapi = require('hapi');
var Jill = require('../');


var server = new Hapi.Server(15301);
server.pack.register(Jill, function (err) {

    if (err) {
        return console.error(err);
    }

    server.start(function (err) {

        if (err) {
            return console.error(err);
        }

        console.log('Server started on 15301');
    });
});
