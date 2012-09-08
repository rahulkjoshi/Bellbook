/**
 * ===========================================================================
 * Book shows the details of a single book, usually positioned near the search
 * bar.
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-04-2012 by Vervious
 
define('logic/controllers/book', 
	[ 'logic/models/book', // our Book model class. Blueprint for storing information about a book
	  'jquery', 
	  'ember'   ],
	function( Book ) {

		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.
		return Ember.Controller.extend({

			init: function(){
		        this._super(); // must call super for framework code
		    },

		    // set to 'context' by Router's connectOutlet()
		    // {isbn: value}
		    content: null, 

		    // We want to update our stored JSON value when our represented ISBN ('content') changes.
		    // The JSON is loaded asynchronously so representedBook is in a separate property.
		    contentDidChange: function() {
		    	// Wipe previous content
		    	var previousBook = this.get("representedBook");
		    	// Ember does not destroy objects automatically. It is a good idea to destroy objects if they are no longer needed.
		    	// Theoretically, there should be a destroy() call for every create() call to make sure we don't waste memory.
		    	if (previousBook) previousBook.destroy(); 
		    	var newISBN = this.get('content').isbn;
		        this.set("representedBook", Book.create({ isbnToLoad: newISBN })); // Use another book model
			}.observes('content'),

			/* REPRESENTED BOOK 
			============================================================================================*/

		    // @return A book model populated using the isbn as set by context.
		    // Fetched using an external service.
		    representedBook: null
		    
		});
	}
);