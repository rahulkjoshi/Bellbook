/**
 * ===========================================================================
 * The Main View of BellBook.
 *
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 08-19-2012 by Vervious
 
// Ask for dependencies...
define('views/bellbook', [
		'ember'
	],
	/**
	 * Main application view.
	 * (Build and create the main view of our application)
	 *
	 * @returns Class
	 */
	function() {
		return Ember.View.extend({
			mouseDown: function() {
			    window.alert("hello world!");
			}
		});
	}
);