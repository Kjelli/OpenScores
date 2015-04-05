var Joi = require('joi');
var Boom = require('Boom');
var listify = require('./listify');

exports.list = {
  handler: function(request, reply){

    this.api.call('GET', '/api/boards', '', function(err, code, payload){

      if(err){
        reply(Boom.create(404, 'Could not fetch boards'));
        return;
      }

      reply.view('layout_boards', {
        page: 'boards',
        boardlist: listify(payload, {
          idKey: 'boardId',
          nameKey: 'boardName',
          listClass: 'boards-list',
          itemClass: 'boards-list-item',
          labelClass: 'label-board',
          href: '/boards/'
        })
      });
    });
  }
}
