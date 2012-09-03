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
	[ 'ember', 'Bellbook' ],
	// We get a reference to the app
	function( Bellbook ) {
		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.
		return Ember.Controller.extend({
			init: function(){
		        this._super(); // must call super for framework code
		    },
		    // A reference to the router that is set by app.js or router.js
		    router: null,
		    // An input field that we manage that templates can ask us for
		    InputField: Ember.TextField.extend({
				placeholder: 'ISBN13',
				insertNewline: function() {

				}
			}),
		    // The current input value; usually bound to a subproperty of EmperorView in emperor.handlebars
		    isbnInput: "",
		    // Actions
		    openBookWithISBN: function( isbn13 ) {
		    }
		});
	}
);