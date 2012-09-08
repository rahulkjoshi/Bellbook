/**
 * ===========================================================================
 * Start controls the "start" view, where there is an isbn input bar...
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 08-19-2012 by Vervious
 
define('logic/controllers/start', 
	[ 'ember' ],
	function(  ) {
		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.
		return Ember.ArrayController.extend({
			init: function(){
		        this._super(); // must call super for framework code
		        // Grab recent values
		        this.refresh();
		    },
		    refresh: function() {
		    	// Construct the resource URL from which to retrieve backend data.
		    	// See <http://docs.emberjs.com/symbols/Ember.String.html#method=.fmt> for Docs on 'string.fmt'
		    	// The number is how much recent activity to get. See api/index.php.
		    	var url = 'api/activity/%@'.fmt(8); // (relative to location of app.js)

	            // Now, update our content.
	            // Because the scope ('this') changes when entering the function normally, use jQuery's
		    	// proxy function to make sure that 'this' points to the controller inside the callback.
		    	$.getJSON(url, $.proxy(function ( jsonData ) { 
		    		// Remove previous data
		    		this.set('content', []);
				    // iterate through the key=>values of the JSON data object
				    if (jsonData && jsonData.totalItems > 0) {
					    $(jsonData.items).each(function(key,value){
					       // TODO: Create a new Activity model, populate with data, and push to self.
					    })
					}
		    	}, this));
		    }
		});
	}
);