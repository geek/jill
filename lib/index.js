// Include modules

var Data = require('./data');
var Routes = require('./routes');
var Package = require('../package.json');


exports.register = function (server, options, next) {

    server.dependency('nes');

    var data = new Data(options);
    data.start(function (err) {

        if (err) {
            return next(err);
        }

        server.bind(data);
        server.route(Routes);

        server.expose('getBoards', data.getBoards.bind(data));

        next();
    });
};


exports.register.attributes = {
    pkg: Package
};
