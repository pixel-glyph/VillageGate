
const $ = require('jquery'),
      fromPolyfill = require('./polyfills.js'),
      $header = $('.home-header');

let st,
    lastScrollTop = 0,
    isPassed = false,
    navbarHeight = $('.home-header').outerHeight(),
    viewportWidth = window.innerWidth;

// land logo and wide nav elements on page load
window.onload = function() {
  setTimeout( () => {
    $('.logo').addClass('appear');
  }, 10);

  setTimeout( () => {
    $('.wide-nav li').each( (i) => {
      setTimeout( () => {
        $('.wide-nav li').eq(i).addClass('appear');
      }, (700 * (Math.exp(i * 0.16))) - 700);
    });
    // after logo lands in, remove transition to allow proper scrolling effects
    $('.logo').css({
      'transition' : 'none'
    });
  }, 700);
};

if (!Array.from) Array.from = fromPolyfill;

// apply FA class on social icons for bigger size when dislpay width is over 600
if (viewportWidth > 600) {
  let icons = Array.from(document.getElementsByClassName('fa-stack'));
  icons.forEach( elem => elem.className = "fa-stack fa-2x" );
}

// open and close mobile nav on mobile toggle click
$('.mobile-nav-toggle').click(function() {
  if ($(this).hasClass('open')) {
    $(this).removeClass('open');
    $header.removeClass('open');
  } else {
    $(this).addClass('open');
    $header.addClass('open');
  }
});

// close mobile nav when clicking outside nav
$('.home-main').on('click', function() {
  if ($('.mobile-nav-toggle').hasClass('open')) {
    $('.mobile-nav-toggle').removeClass('open');
    $header.removeClass('open');
  }
});

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
  }

  // land biz elems on page when they are scrolled 30% into the window
  $('.biz').each( (index, el) => {
    if (st > $(el).offset().top - ($(window).height() / 1.3))
      $(el).addClass('is-showing');
  });

	// Keep navbar hidden when scrolling down
  if (!$header.hasClass('open')) {
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
  }

	lastScrollTop = st;
});
