// on ready (occurs once during page load)
$(function(){
	// bind an event for handling the enter key from inside an input
	$('body').on("keypress.verj.inputs", 'input', function(e){
		// if the pressed key is the return key
		if(e.which == 13){
			// move up the DOM looking for the 'closest' submit button
			var submit = findClosestSubmit($(this));
	
			// trigger the click event on that submit button
			if(submit) submit.trigger("click");
	
			return false;
		}
	});
});


var verj = (function(){
	return {
		// occurs everytime an ajax call refreshes the page
		pageReady: function(){
			// bind to the event that fires when the login panel is shown, focus to first field
			$('.dropdown-menu').parent().on('shown.bs.dropdown', function(e){
				$(this).children('.dropdown-menu').find('input').first().focus();
			});
		}
	}
})();