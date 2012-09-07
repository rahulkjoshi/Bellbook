/**
 * ===========================================================================
 * BellbookController is never instantiated on its own;
 * It is ALWAYS subclassed. All of the other controllers are subclasses
 * of Bellbook; Bellbook exists to implement common functionality.
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-03-2012 by Vervious
 
/* return @Class */
define('logic/controllers/bellbook', 
	[ 'ember' ],
	function( ) {
		// Note that controllers are defined separately from views - sort of
		// The relationship between the two is up to the view, router, or Ember to create
		// --------------------------------------------------------------------------------------
		// HOWEVER, when rendering, the view can get a reference to the controller who is controlling it
		// while remaining fully decoupled, using handlebars rendering contexts, so that's nice.
		return Ember.Controller.extend({
		    // Convenience Methods
		    // Causes whoever invokes the function to send an action to a target.
		    sendAction: function () {
		    	var action = this.get('action');
		    	this.get('target')[action](this);
		    },
		    // Disconnect an outlet. Future versions of ember should have this
		    // already implemented, so remove this function once disconnectOutlet
		    // makes it into Ember. Until then...
		    disconnectOutlet: function( outletName ) {
			    outletName = outletName || 'view';
			   	this.set(outletName, null);
			},
		});
	}
);