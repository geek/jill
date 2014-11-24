// Include modules

var Data = require('./data');
var Routes = require('./routes');
var Package = require('../package.json');


exports.register = function (server, options, next) {

    var data = new Data(options);
    data.start(function (err) {

        if (err) {
            return next(err);
        }

        server.app.data = data;
        server.route(Routes);

        next();
    });
};


exports.register.attributes = {
    pkg: Package
};
