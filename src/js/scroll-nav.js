// Scrolling Nav link Trigger.
$(".navbar-nav li a[href^='#']").on('click', function(e) {
	// prevent default anchor click behavior
	e.preventDefault();

	// animate
	$('html, body').animate({
		scrollTop: $(this.hash).offset().top
	  }, 300, function(){

		// when done, add hash to url
		// (default click behaviour)
		window.location.hash = this.hash;
	  });
 });




// scrolling Nav Toggle Class
$(function () {
	$(document).scroll(function(){
		var $topNav = $(".topNav");
		$topNav.toggleClass('scrolled', $(this).scrollTop() > $topNav.height());
	});
});



console.log('scroll-nav.js ==> ok!');