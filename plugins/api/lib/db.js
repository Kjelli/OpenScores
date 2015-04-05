var mysql =     require('mysql');
var config =    require('./config');
var pool =      mysql.createPool(config.dev.db);


module.exports = pool;
