// utility function for issuing an alert message
function bootstrapAlert(elementId, type, message, timeout) {
	// remove any old alert-* class
	$(elementId).removeClass (function (index, className) {
		return (className.match (/\balert-\S+/g) || []).join(' ');
	})
	// add the new class
	.addClass('alert-' + type)
	// show the error message
	.show().html(message);
	
	// hide the message after so many milliseconds
	if (timeout || timeout === 0) setTimeout(function() {$(elementId).hide();}, timeout);
}

// check a given element for siblings that are submit inputs
function findClosestSubmit(el){
	var submits = el.parent().find('input[type=submit]:visible');
	// if no siblings are submits, move up a level and look again
	if(!submits.length && el.parent().length){
		submits = findClosestSubmit(el.parent());
	}

	return submits.first();
}

// clear alerts for a given selector
function clearValidation(selector){
	$(selector).find('.alert').hide();
	$(selector).find('.is-invalid, .is-valid').removeClass('is-invalid .is-valid');
}