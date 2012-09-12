/**
 * ===========================================================================
 * This class is a model representing a Book (MVC) - query this model for data
 *
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 08-21-2012 by Vervious
 
// Book representation/model
// returns @Class
define('logic/models/book', 
	['ember'], // dependencies
	function() {
		return Ember.Object.extend({
			// Initialize with information. Takes given ISBN
			// and propagates book with information from Google Book API
			init: function(){
				// must call super for framework code
		        this._super(); 
		        // For some reason, observers don't get notified when the property is set in the .create() method
		        // So we manually refresh for the first and last time.
		        this.refresh(); 
		    },

		    // The query to search for a book by ISBN using the Google Books API v1; isbn to be appended at end
		    // TODO: conform with Google API branding guidelines.
		    googleAPIIsbnSearchString: "https://www.googleapis.com/books/v1/volumes?q=isbn:%@",


		    /* ============
		     *  PROPERTIES
		     * ============ */
		    isbnToLoad: null, // the ISBN to load, or that was most recently loaded. Does not distinguish between isbn10 and isbn13
			isbn13: null, // numerical, no dashes, primary key (primary means identifying the book)
			isbn10: null, // numerical, no dashes
			title: null, // string
			authors: null, // list of strings
			publisher: null, // string
			imageLinkSmall: null,
			// year published, place published, image url
			// courses...

			/* ============
		     *   METHODS
		     * ============ */
		    // Refresh with data from new isbn
			refresh: function() {
		    	// Load new content
			    var newISBN = this.get('isbnToLoad');
			    var url = this.get('googleAPIIsbnSearchString').fmt(newISBN);
		    	console.log("Retrieving data from: " + url);
		    	// Because the scope ('this') changes when entering the function normally, use jQuery's
		    	// proxy function to make sure that 'this' points to the controller inside the callback.
		    	$.getJSON(url, $.proxy(function ( jsonData ) { 
		    		// Now we can update all our properties based on what Google books API gave us.
		    		this.updatePropertiesWithJSONData( jsonData );
		    	}, this));
			}.observes("isbnToLoad"), // todo: fix, doesn't update

			// Actually save the data
			updatePropertiesWithJSONData: function( updatedJSONBookData ) {

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

				console.log("Fetching data from Google Books.");
		    	// Finally, we can work with our volumeJSON data.
		    	// Update the represented book. Any changes we make to _representedBook are saved 
		    	// to this._representedBook because this._representedBook is an object.
		    	if (volumeJSON.volumeInfo.industryIdentifiers[1])
		    		this.set('isbn13', volumeJSON.volumeInfo.industryIdentifiers[1].identifier);
		    	else this.set('isbn13', null);
		    	this.set('isbn10', volumeJSON.volumeInfo.industryIdentifiers[0].identifier);
		    	this.set('title', volumeJSON.volumeInfo.title);
		    	this.set('authors', volumeJSON.volumeInfo.authors);
		    	this.set('publisher', volumeJSON.volumeInfo.publisher);
		    	if (volumeJSON.volumeInfo.imageLinks) {
		    		// TODO: User submitted images too... and search Amazon for generic images.
		    		var imageLink = volumeJSON.volumeInfo.imageLinks.small;
		    		if (!imageLink) imageLink = volumeJSON.volumeInfo.imageLinks.thumbnail;
		    		if (!imageLink) imageLink = volumeJSON.volumeInfo.imageLinks.smallThumbnail;
		    		this.set('imageLinkSmall', imageLink); // can be null
		    		console.log("updated Book image.");
		    	}
		    	else this.set('imageLinkSmall', false);
			}
		});
	}
);


