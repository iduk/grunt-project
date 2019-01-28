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