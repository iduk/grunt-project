// Pakage Modules JS

// Select2
$(function () {
	$('select').each(function () {
		$(this).select2({
			theme: 'bootstrap4',
			width: '100%',
			placeholder: $(this).attr('placeholder'),
			allowClear: Boolean($(this).data('allow-clear')),
		});
	});
});


// wow.js 
$(".wow").each(function () {
	var wowHeight = $(this).height();
	$(this).attr("data-wow-offset", wowHeight);
});

wow = new WOW({
	boxClass: 'wow', // default
	animateClass: 'animated', // default
	offset: 0, // default
	mobile: true, // default
	live: true // default
});
wow.init();










console.log('pakages modules ==> ok!');
// 네비게이션 버튼 트리거, 부드러운 스크롤 효과
$(".navbar-nav li a[href^='#']").on('click', function(e) {
	
	e.preventDefault();

	// animate
	$('html, body').animate({
		scrollTop: $(this.hash).offset().top
	  }, 300, function(){
		window.location.hash = this.hash;
	  });

 });




// 네비게이션 스크롤시 클래스(효과) 추가
$(function () {
	$(document).scroll(function(){
		var $topNav = $(".topNav");
		$topNav.toggleClass('scrolled', $(this).scrollTop() > $topNav.height());
	});
});



console.log('scroll-nav.js ==> ok!');