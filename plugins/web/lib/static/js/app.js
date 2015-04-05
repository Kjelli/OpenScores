$(function(){
  hoverAnimation('.game-thumb', '#002447', '#002858');
  hoverAnimation('.games-list-item, .boards-list-item', '#002447', '#002858');

  $('#search').on('keyup', function(e){
    if($(this).val().length > 0) {
      $('#results').html('Looking up...');
      $.get( '/api/games?name=' + $(this).val(), function(data, status) {
        if(data !== '[]'){
          $('#results').html(data);
        }else{
          $('#results').html('No results.');
        }
      });
    }else if($(this).val().length == 0){
      $('#results').html('Search for games!');
    }
  });
});

var hoverAnimation = function (selector, color1, color2) {
    var query = $(selector);
    query.each(function (index, element) {
        var col = (index % 2 === 0 ? color1 : color2);
        $(element).css('background-color', col);
        $(element).hover(function () {
            $(this).animate({
                backgroundColor: '#0071de',
                color: '#fff'
            }, 120);
        }, function () {

            $(this).animate({
                backgroundColor: col,
                color: '#fff'
            }, 120);
        });
    });
};
