// Pakage Modules JS

// Select2
$(function(){
	$('select').each(function () {
		$(this).select2({
			theme: 'bootstrap4',
			width: '100%',
			placeholder: $(this).attr('placeholder'),
			allowClear: Boolean($(this).data('allow-clear')),
		});
	});
});

console.log('modules.js ==> ok!');