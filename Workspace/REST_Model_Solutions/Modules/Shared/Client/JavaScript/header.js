
// document ready functions
$(document).ready(function(){
	// set up drop down menu events when the page is loaded
	dropdownMenuEvents();
	// include server side function call whenever the screen brakpoint range changes, only if the flag has been set by the form that the component has been associated with
	if ($('#windowResizeEvent').val()=='Y') {
		breakpointListener();
	}
});

// applies javascript events to make drop down menus work nicely: nb. called once on $(document).ready(), i.e. when a page first loads, and the again if the user logs in or out
function dropdownMenuEvents() {
   $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
      if (!$(this).next().hasClass('show')) {
         $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');  

      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
         $('.dropdown-submenu .show').removeClass("show");
      });
   return false; 
   });	
}

// write menu item parent menu text into session state. We use this value to uniquely identify which menu item has been clicked - so that we can accurately build the breadcrumb trail
function setMenuItemParentMenuIDs(p) {
	 // write the menu items parent menu list away to session state
	 try {
	 	  // set up the component prefix: this is held in a hidden field on the page, the value is set by processing associated with the component's event field
	    com.ebasetech.clientapi.componentPrefix=$("#cpID").val();
	    // write the parent menu list away to session state
	    $eb.executeFunction('saveParentMenuIDs', p.getAttribute('data-parentMenuIDs'), false, false);
	 } 
	 // always clear the component prefix
	 finally {com.ebasetech.clientapi.componentPrefix=null;}
	 // run the URL associated with this link
	 window.location = p.href;
	 // return false to prevent the default event from running
	 return false;
}

// provides a call to an implementable serverside function whenever the screen breakpoint range changes
function breakpointListener() {
	
   // set up initial range
   var previousRange = '';
   function getRange() {
      if ($(window).width() < 576) return 'xs';
      if ($(window).width() >= 576 && $(window).width() < 768) return 'sm';
      if ($(window).width() >= 768 && $(window).width() < 992) return 'md';
      if ($(window).width() >= 992 && $(window).width() < 1200) return 'lg';
      if ($(window).width() >= 1200) return 'xl';
   }
   // timer so that we only pick up the final resize event
   var waitForFinalEvent = function () {
      var b = {};
      return function (c, d, a) {
        a || (a = "test");
        b[a] && clearTimeout(b[a]);
        b[a] = setTimeout(c, d)
      }
    }();
   // listen for screen resize of breakpoint range 
   var fullDateString = new Date();
   $(window).resize(function () {
      waitForFinalEvent(function(){
         if (getRange() != previousRange) {
             // breakpoint range has changed, so run a server side function
             serverFunctionCall(getRange());
             // reset the previous breakpoint range value
             previousRange = getRange();   	
         }
      }, 150, fullDateString.getTime())
   });

   // last thing: trigger a resize event to make sure that we're correctly set up to begin with
   $(window).trigger('resize');
   
   // call server side function via client API
   function serverFunctionCall(range) {
      try {
	 	     // set up the component prefix: this is held in a hidden field on the page, the value is set by processing associated with the component's event field
			com.ebasetech.clientapi.componentPrefix = $("#cpID").val();
	       // set up a field containing the current screen width
			$('#range').val(range);
	       // call a server side function to make any control chnages required because of the chnage of screen width: this function is defined by the form that this
	       // component is associated with, i.e. is overridden at the form level
	       $eb.executeFunction('breakpointRangeChanged',null,true,true);
	    } 
	    // always clear the component prefix
	    finally {com.ebasetech.clientapi.componentPrefix=null;}
   }
}
