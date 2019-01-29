// Pakage Modules JS
// document ready
$(function () {

	// Select2
	$('select').each(function () {
		$(this).select2({
			theme: 'bootstrap4',
			width: '100%',
			placeholder: $(this).attr('placeholder'),
			allowClear: Boolean($(this).data('allow-clear')),
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


});
// document










console.log('pakages modules ==> ok!');