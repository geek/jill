var Hapi = require('hapi');
var Jill = require('../');


var server = new Hapi.Server();
server.connection({ port: 15301 });

server.register(Jill, function (err) {

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
