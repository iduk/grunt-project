(function($){

	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash),
			headerHeight = $('#mainNav').height(); // Get fixed header height
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - headerHeight)
				}, 800, 'easeInOutExpo');
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav'
	});

})(jQuery); // End of use strict


// Using Select2
$('.select2js').select2({
	language: 'ko',
	theme: 'Bootstrap4',
	placeholder: 'Base Select',
	dir: 'rtl' // 정렬하기
	//dropdownParent: $('#modal-id') // Modal
});

console.log('잘되고이써...');