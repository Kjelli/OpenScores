var pool = require('./db');


exports.list = function(next){

  pool.getConnection(function(err, connection){

    if(err) return next(err);

    var queryString = "SELECT * FROM boards";
    connection.query(queryString, function(err, result){

      connection.release();
      if(err) return next(err);

      console.log("Listing all boards...");
      return next(null, result);
    });

  });
}

exports.get = function(id, next){

  pool.getConnection(function(err, connection){

    if(err) return next(err);
    var queryString = 'SELECT * FROM boards WHERE boardId=' + connection.escape(id);
    connection.query(queryString, function(err, result){

      connection.release();
      if(err) return next(err);

      if(result[0]){
        return next(null, result[0]);
      }else{
        // TODO #################################################### TODO
        //       better error handling?
        // TODO #################################################### TODO
        return next({statuscode: 404, error: "not found"});
      }
    });
  });
}

var getByName = function(name, next){

  pool.getConnection(function(err, connection){

    if(err) return next(err);

    var queryString = 'SELECT boardId FROM boards WHERE boardName='
                      + connection.escape(name);

    connection.query(queryString, function(err, result){

      connection.release();
      if(err) return next(err);

      return next(null, result[0]);
    });
  });
}

exports.post = function(board, next){

  pool.getConnection(function(err, connection){

    if(err) return next(err);
      //TODO
    return next(null);
  });
}

exports.getByGame = function(id, next){

  pool.getConnection(function(err, connection){

    if(err) return next(err);

    var queryString = 'SELECT * FROM boards, games WHERE boards.gameId='
                      + connection.escape(id)+' AND games.gameId='
                      + connection.escape(id);

    connection.query(queryString, function(err, result){

      connection.release();
      if(err) return next(err);

      return next(null, result);
    });


  })
}
