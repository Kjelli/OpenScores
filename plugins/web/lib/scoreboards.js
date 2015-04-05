exports.list = {
  handler: function(request, reply){
    reply.view('scoreboards', {
      page: 'scoreboards'
    });
  }
};
