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
	[  'logic/controllers/bellbook', 'ember'],
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
		    // The current input value; usually bound to a subproperty of EmperorView in emperor.handlebars
		    isbnInput: "",
		    // Actions
		    openBookWithInputField: function ( view ) {
		    	this.openBookWithISBN(view.get('value'));
		    },
		    openBookWithISBN: function( isbn13 ) {
		    	var router = this.get('target');
		    	if (router && isbn13) {
		    		router.send('loadBookForIsbn', {isbn: isbn13});
		    	}
		    }
		});
	}
);