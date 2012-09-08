/**
 * ===========================================================================
 * This class is a model representing an "activity" 
 * which includes:
 * -- public transaction completinos 
 * -- new listings
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-09-2012 by Vervious
 
// Activity representation/model
// returns @Class
define('logic/models/activity', 
	['ember'], // dependencies
	function() {
		return Ember.Object.extend({
			type: null, // 'newListing' OR 'completedPublicTransaction'
			seller: null, // Just a name at this point
			buyer: null, // Just a name, and only relevant with transactions
			price: "20", // A number, relevant for new listings
			book: null // instance of book object
		});
	}
);


