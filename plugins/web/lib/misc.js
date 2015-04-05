exports.home = {
  handler: function(request, reply){
    reply.view('layout_home', {
      page: 'home',
      message: 'Hello Tobzoor'
    });
  }
};

exports.admin = {
  handler: function(request, reply){
<<<<<<< HEAD
    reply.view('layout_admin', {
=======
    return reply.view('admin', {
>>>>>>> origin/master
      page: 'admin'
    });
  }
};
