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
			isbn13: null, // numerical, no dashes, primary key (primary means if identifying the book)
			isbn10: null, // numerical, no dashes
			title: null, // string
			authors: null, // list of strings
			publisher: null, // string
			imageLinkSmall: null
			// year published, place published, image url
			// courses...
		});
	}
);


