/**
 * ===========================================================================
 * Emperor controls all controllers... and nothing else.
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-01-2012 by Vervious
 
define('logic/controllers/emperor', 
	[  'logic/controllers/bellbook', 'ember'], // Note that Ember should ALWAYS be the last dependency, otherwise you get errors for a reason I don't know (screw trial and error)
	// Subclass of BelbookController
	function( BellbookController ) {
		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.
		return BellbookController.extend({
			init: function(){
		        this._super(); // must call super for framework code
		    },
		    // The current input value; usually bound to a text field in EmperorView in emperor.handlebars
		    isbnInput: "",
		    // The current type of isbn input field area - whether to fill screen (full),
		    // fill a third of the screen (mid)
		    // Or be positioned like a normal search bar at the top left (basic)
		    inputAreaType: "full",
		    // Actions
		    openBookWithInputField: function ( view ) {
		    	this.openBookWithISBN(view.get('value'));
		    },
		    openBookWithISBN: function( isbn13 ) {
		    	// What is set() and get()? You should use these to set properties and get the values of properties.
		    	// Why not just use Object.property? Because ember relies on set() and get() to make bindings work.
		    	// So just use set("property", newVal) and get("property").
		    	var router = this.get('target');
		    	if (router && isbn13) {
		    		router.send('loadBookForIsbn', {isbn: isbn13});
		    	}
		    }
		});
	}
);