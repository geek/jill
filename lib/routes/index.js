// Load modules

var Command = require('./command');
var Log = require('./log');
var Logs = require('./logs');
var Board = require('./board');
var Boards = require('./boards');
var Addon = require('./addon');


module.exports = [
    { path: '/boards', method: 'GET', config: Boards.get },

    { path: '/board/{boardId}', method: 'GET', config: Board.get },
    { path: '/board/{boardId}', method: 'PUT', config: Board.update },

    { path: '/board/{boardId}/{addonId}', method: 'GET', config: Addon.get },
    { path: '/board/{boardId}/{addonId}', method: 'PUT', config: Addon.update },
    { path: '/board/{boardId}/{addonId}/reading', method: 'POST', config: Addon.createReading },
    { path: '/board/{boardId}/{addonId}/command', method: 'POST', config: Addon.createCommand },

    { path: '/command', method: 'GET', config: Command.get },

    { path: '/logs', method: 'GET', config: Logs.get },

    { path: '/log/{logId}', method: 'GET', config: Log.get },
    { path: '/log', method: 'POST', config: Log.create }
];
