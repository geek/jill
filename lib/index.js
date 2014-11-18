// Include modules

var Data = require('./data');
var Routes = require('./routes');
var Package = require('../package.json');


exports.register = function (pack, options, next) {

    var data = new Data(options);
    data.start(function (err) {

        if (err) {
            return next(err);
        }

        pack.app.data = data;
        pack.route(Routes);

        next();
    });
};


exports.register.attributes = {
    pkg: Package
};
