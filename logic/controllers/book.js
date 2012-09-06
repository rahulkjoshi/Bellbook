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
		        var storedRepresentedBook = Book.create(); // make a book with no content
		        this.set("_representedBook", storedRepresentedBook);

		    },

		    // The query to search for a book by ISBN using the Google Books API v1; isbn to be appended at end
		    // TODO: conform with Google API branding guidelines.
		    googleAPIIsbnSearchString: "https://www.googleapis.com/books/v1/volumes?q=isbn:",

		    // set to 'context' by Router's connectOutlet()
		    // {isbn: value}
		    content: null, 

		    // The JSON object with the Google API book information for the given isbn.
		    googleAPIJSONForCurrentContent: null,

		    // We want to update our stored JSON value when our represented ISBN ('content') changes.
		    // The JSON is loaded asynchronously so representedBook is in a separate property.
		    contentDidChange: function() {
		    	// Wipe previous content
		    	//this.set('googleAPIJSONForCurrentContent', {});
		    	// Load new content
			    var newISBN = this.get('content').isbn;
			    var url = this.get('googleAPIIsbnSearchString') + newISBN;
		    	console.log("Retrieving data from: " + url);
		    	// Because the scope ('this') changes when entering the function normally, use jQuery's
		    	// proxy function to make sure that 'this' points to the controller inside the callback.
		    	$.getJSON(url, $.proxy(function ( jsonData ) { 
		    		// store the retrieved JSON data in this.googleAPIJSONForCurrentContent
		    		this.set('googleAPIJSONForCurrentContent', jsonData);
		    	}, this));
			}.observes('content'),

			/* REPRESENTED BOOK 
			============================================================================================*/

		    // The actual represented Book object. Use .representedBook instead.
		    // This is like a private variable, the one below is the real getter.
		    _representedBook: null,

		    // @return A book model populated using the isbn as set by context.
		    // Fetched using an external service.
		    // Not settable (don't use controller.representedBook = blah)
		    representedBook: function() {
		    	var _representedBook = this.get("_representedBook");
		    	var updatedJSONBookData = this.get("googleAPIJSONForCurrentContent");
		    	// Make sure we are getting the right kind of JSON data
		    	if (!updatedJSONBookData || updatedJSONBookData.kind != "books#volumes") {
		    		console.log("No Book information has been retrieved yet.");
		    		return null;
		    	}

		    	// Make sure we have a clear match of ISBN to book, if not, return null.
		    	if (updatedJSONBookData.totalItems < 1) {
		    		console.log("ISBN could not be matched to one book. Number of matched results: " + updatedJSONBookData.totalItems);
		    		return null;
		    	}

		    	// Now grab the volume from the list of volumes Google Books API should have returned
		    	var volumeJSON = updatedJSONBookData.items[0]; // TODO: Make it possible to select a book from search results (e.g. Norton)
		    	// See {https://developers.google.com/books/docs/v1/reference/volumes} for JSON representation documentation.
		    	if (volumeJSON.kind != "books#volume") {
		    		console.log("Google responded with something that's not a book! Book information was not retrieved.");
		    		return null;
		    	}

		    	// Finally, we can work with our volumeJSON data.
		    	// Update the represented book. Any changes we make to _representedBook are saved 
		    	// to this._representedBook because this._representedBook is an object.
		    	if (volumeJSON.volumeInfo.industryIdentifiers[1])
		    		_representedBook.set('isbn13', volumeJSON.volumeInfo.industryIdentifiers[1].identifier);
		    	else _representedBook.set('isbn13', null);
		    	_representedBook.set('isbn10', volumeJSON.volumeInfo.industryIdentifiers[0].identifier);
		    	_representedBook.set('title', volumeJSON.volumeInfo.title);
		    	_representedBook.set('authors', volumeJSON.volumeInfo.authors);
		    	_representedBook.set('publisher', volumeJSON.volumeInfo.publisher);
		    	if (volumeJSON.volumeInfo.imageLinks) {
		    		// TODO: User submitted images too... and search Amazon for generic images.
		    		var imageLink = volumeJSON.volumeInfo.imageLinks.small;
		    		if (!imageLink) imageLink = volumeJSON.volumeInfo.imageLinks.thumbnail;
		    		if (!imageLink) imageLink = volumeJSON.volumeInfo.imageLinks.smallThumbnail;
		    		_representedBook.set('imageLinkSmall', imageLink); // can be null
		    	}
		    	else _representedBook.set('imageLinkSmall', false);
		   
			    return _representedBook;

			}.property('googleAPIJSONForCurrentContent'), // whenever 'googleAPIJSONForCurrentContent' changes, representedBook is updated
		});googleAPIJSONForCurrentContent
	}
);