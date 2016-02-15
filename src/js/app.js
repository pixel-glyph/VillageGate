
const $ = require('jquery');
let st,
    didScroll,
    lastScrollTop = 0,
    delta = 5,
    isPassed = false,
    navbarHeight = $('.home-header').outerHeight();

$(window).scroll(function(){
  //didScroll = true;
  st = $(this).scrollTop();

  if (st < $('.new').offset().top) {
    $('.top-img').css({
      'transform': 'traslate(0, 20%)'
    });

    $('.logo').css({
      'transform': 'translate(0,' + st /6.5 + '%)',
      'opacity': 1 - (st / 750)
    });
  }


  $('.biz').each(function(index, el) {
    if (st > $(el).offset().top - ($(window).height() / 1.2))
      $(el).addClass('is-showing');
  });


  // scroll more than delta
	//if (Math.abs(lastScrollTop - st) <= delta)
		//return;

	// If scrolling down and past navbar
	if (st > lastScrollTop && st > navbarHeight) {
		$('.home-header').addClass('nav-up');
	} else {
    // Top of page
    if (st === 0) {
      $('.home-header').removeClass('on-screen');
      $('.home-header').removeClass('nav-up');
      // Scroll Up
    } else if (st + $(window).height() < $(document).height() && st > navbarHeight) {
      $('.home-header').addClass('on-screen');
      $('.home-header').removeClass('nav-up');
    }
	}

	lastScrollTop = st;
});
