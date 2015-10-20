// Include modules

var Data = require('./data');
var Routes = require('./routes');
var Package = require('../package.json');


exports.register = function (server, options, next) {

    server.dependency('nes');
    server.subscription('/command');
    server.subscription('/reading');

    var data = new Data(options);
    data.start(function (err) {

        if (err) {
            return next(err);
        }

        server.bind(data);
        server.route(Routes);

        server.expose('getBoards', data.getBoards.bind(data));
        server.expose('getBoard', data.getBoard.bind(data));
        server.expose('getLogs', data.getLogs.bind(data));

        next();
    });
};


exports.register.attributes = {
    pkg: Package
};
