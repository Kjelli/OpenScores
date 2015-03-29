var mysql = require('mysql');
var config = require('./config');
var pool = mysql.createPool(config.dev.db);

exports.list = function (next) {

    pool.getConnection(function (err, connection) {

        if (err) {
            return next(err);
        }

        var queryString = 'SELECT * FROM games';
        connection.query(queryString, function (err, result) {

            connection.release();
            if (err) {
                return next(err);
            }

            console.log('Listing all games...');
            return next(err, result);
        });

    });
};

exports.get = function (id, next) {

    pool.getConnection(function (err, connection) {

        if (err) {
            return next(err);
        }
        var queryString = 'SELECT * FROM games WHERE gameId = ' + connection.escape(id);
        connection.query(queryString, function (err, result) {

            connection.release();
            if (err) {
                return next(err);
            }

            if (result[0]) {
                return next(err, result[0]);
            }
            // TODO #################################################### TODO
            //       better error handling?
            // TODO #################################################### TODO
            return next({statuscode: 404, error: 'not found'});
        });
    });
};

var getByName = function (name, next) {

    pool.getConnection(function (err, connection) {

        if (err) {
            return next(err);
        }

        var queryString = 'SELECT gameId FROM games WHERE gameName=' +
            connection.escape(name);

        connection.query(queryString, function (err, result) {

            connection.release();
            if (err) {
                return next(err);
            }

            return next(err, result[0]);
        });
    });
};

exports.post = function (game, next) {

    pool.getConnection(function (err, connection) {

        if (err) {
            return next(err);
        }

        getByName(game.gameName, function (err2, result) {

            if (err2) {
                return next(err2);
            }
            // TODO #################################################### TODO
            //       better error handling?
            // TODO #################################################### TODO
            if (result) {
                /*eslint-disable */
                console.log("Attempted to create duplicate game: '" + game.gameName + "' but failed.");
                /*eslint-enable */
                return next({statuscode: 400, error: 'duplicate'});
            }

            var queryString = 'INSERT INTO games(gameName, gameDescription, gameOwner) VALUES(' +
                connection.escape(game.gameName) + ', ' +
                connection.escape(game.gameDescription) + ', ' +
                connection.escape(game.gameOwner) + ')';

            connection.query(queryString, function (err, result) {

                connection.release();
                if (err) {
                    return next(err);
                }

                console.log('Game was created successfully: ' + game.gameName + ', id: ' + result.insertId);
                return next(err, result.insertId);
            });

        });
    });
};
