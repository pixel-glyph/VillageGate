
var $ = require('jquery');

$(window).scroll(function(){

  let wScroll = $(this).scrollTop();

  $('.logo').css({
    'transform': 'translate(0, ' + wScroll /6.5 + '%)'
  });

  if (wScroll > 756) {
    $('.home-header').addClass('on-screen');
  } else {
    $('.home-header').removeClass('on-screen');
  }
});
