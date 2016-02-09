
const $ = require('jquery');

let st,
    didScroll,
    lastScrollTop = 0,
    delta = 5,
    navbarHeight = $('.home-header').outerHeight();

$(window).scroll(function(){
  didScroll = true;
  st = $(this).scrollTop();

  $('.top-img').css({
    'transform': 'traslate(0, 20%)'
  });

  $('.logo').css({
    'transform': 'translate(0,' + st /6.5 + '%)',
    'opacity': 1 - (st / 750)
  });

});

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 100);


function hasScrolled() {

  // Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - st) <= delta)
		return;

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight){
		// Scroll Down
		$('.home-header').addClass('nav-up');
	} else {
		// Scroll Up
    if (st === 0) {
      $('.home-header').removeClass('on-screen');
    } else if(st + $(window).height() < $(document).height()) {
      $('.home-header').addClass('on-screen');
      $('.home-header').removeClass('nav-up');
    }
	}

	lastScrollTop = st;
}
