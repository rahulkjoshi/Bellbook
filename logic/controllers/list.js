/**
 * ===========================================================================
 * List displays the available listings for the given book.
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-04-2012 by Vervious
 
define('logic/controllers/list', 
	[ 'ember' ],
	function(  ) {

		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.

		// ListController is a subclass of ArrayController
		return Ember.ArrayController.extend({

			init: function(){
		        this._super(); // must call super for framework code
		    },

		    // "Binding source"... we ask for a binding from 'content'
		    // Set by router.js using custom code.
		    bindingSource: null,

		    // Content of the array... an array of listings.
		    content: null,

		    // The book we represent, as a binding...
		    // access as this.get('representedBook')
		    representedBookBinding: "bindingSource.representedBook"
		});
	}
);