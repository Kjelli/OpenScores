exports.home = {
  handler: function(request, reply){
    reply.view('home', {
      page: 'home',
      message: '\'Predefined message set at plugins\\web\\lib\\routes.js:7\''
    });
  }
};

exports.admin = {
  handler: function(request, reply){
    return reply.view('admin', {
      page: 'admin'
    });
  }
};
