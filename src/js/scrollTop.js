
$(function () {
	$(document).scroll(function(){
		var $topNav = $(".topNav");
		$topNav.toggleClass('scrolled', $(this).scrollTop() > $topNav.height());
	});
});



console.log('scrollTop.js ==> ok!');