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

		/* we define some utility functions first */
		function isIsbn13Valid( isbn13 ) { // temporary solution copied off the internet for the sake of time. TODO: verify/rewrite
			if(/-/.test(isbn13)){
		    	isbn13=isbn13.replace(/-/g,'')*1
		    }
		    check = 0;
		    for (i = 0; i < 13; i+=2) {
		      	check += isbn13.toString()[i]*1;
		    }
		    for (i = 1; i < 12; i+=2){
		      	check += 3 * isbn13.toString()[i]*1;
		    }
		    return check % 10 == 0;
		}
		function isIsbn10Valid( isbn10 ) { // temporary solution copied off the internet for the sake of time. TODO: verify/rewrite
			check = 0;
			for (i = 0; i < 9; i++) {
				check += (i+1) * isbn10.toString()[i];
			}
			return check % 11 == isbn10.toString()[9];
		}


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
		    isbnInputDidChange: function () {
		    	var newISBNInput = this.get('isbnInput');
		    	// TODO: strip input
		    	var valid = isIsbn10Valid(newISBNInput) || isIsbn13Valid(newISBNInput);
		    	if (valid) {
		    		this.openBookWithISBN(newISBNInput);
		    	}
		    	else {
		    		this.returnToStart();
		    	}
		    }.observes('isbnInput'),
		    // Load the specified book child screen, passing in the isbn as context.
		    openBookWithISBN: function( isbn ) {
		    	// What is set() and get()? You should use these to set properties and get the values of properties.
		    	// Why not just use Object.property? Because ember relies on set() and get() to make bindings work.
		    	// So just use set("property", newVal) and get("property").
		    	var router = this.get('target');
		    	if (router && isbn) {
		    		router.send('loadBookForIsbn', {isbn: isbn});
		    	}
		    },
		    // load the start child screen again.
		    returnToStart: function() {
				var router = this.get('target');
		    	if (router) {
		    		router.send('loadStart');
		    	}
		    }
		});
	}
);