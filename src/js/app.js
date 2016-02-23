
const $ = require('jquery');
let st,
    lastScrollTop = 0,
    isPassed = false,
    navbarHeight = $('.home-header').outerHeight(),
    viewportWidth = window.innerWidth,
    $header = $('.home-header');

// apply FA class on social icons for bigger size when dislpay width is over 600
if (viewportWidth > 600) {
  let icons = Array.from(document.getElementsByClassName('fa-stack'));
  icons.forEach( elem => elem.className = "fa-stack fa-2x" );
}

$(window).scroll(function() {
  st = $(this).scrollTop();

  if (viewportWidth > 1200) {
    // translate and fade logo until top-img has scrolled by
    if (st < $('.new').offset().top) {
      $('.logo').css({
        'transform': 'translate(0,' + st / 6.5 + '%)',
        'opacity': 1 - (st / 750)
      });
    }

    // parallax scroll effect on quote-img when in viewport
    if (st > $('.quote-img').offset().top - $(window).height()) {
      $('.quote-img').css({
        'background-position': 'center ' + -(st-2100)/5 + 'px'
      });
    }
  }

  // land biz elems on page when they are scrolled 20% into the window
  $('.biz').each( (index, el) => {
    if (st > $(el).offset().top - ($(window).height() / 1.2))
      $(el).addClass('is-showing');
  });

	// Keep navbar hidden when scrolling down
	if (st > lastScrollTop && st > navbarHeight) {
		$header.addClass('nav-up');
	} else {
    // When scrolled to top of page, hide header logo
    // and clear background color
    if (st === 0) {
      $header.removeClass('on-screen');
      $header.removeClass('nav-up');
      // Scroll Up
    } else if (st + $(window).height() < $(document).height() && st > navbarHeight) {
      $header.addClass('on-screen');
      $header.removeClass('nav-up');
    }
	}

	lastScrollTop = st;
});
