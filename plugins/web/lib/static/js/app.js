$(document).ready(function(){
  hoverAnimation('.game-thumb', '#002447', '#002858');
  hoverAnimation('.games-list-item, .boards-list-item', '#002447', '#002858');
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
