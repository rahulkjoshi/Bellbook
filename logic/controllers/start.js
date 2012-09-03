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
		return Ember.Controller.extend({
			init: function(){
		        this._super(); // must call super for framework code
		    }
		});
	}
);