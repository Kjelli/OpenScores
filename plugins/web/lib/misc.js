exports.home = {
  handler: function(request, reply){
    reply.view('index', {
      page: 'home',
      message: '\'Predefined message set at plugins\\web\\lib\\routes.js:7\''
    });
  }
}
