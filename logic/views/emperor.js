/**
 * ===========================================================================
 * The View of Bellbook that encloses all other views
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
define('logic/views/emperor', [
		// Load as text/string since it's not javascript
		'text!display/templates/emperor.handlebars',
		'ember'
	],
	/**
	 * Main application view.
	 * (Build and create the main view of our application)
	 *
	 * @returns Class
	 */
	function( emperorTemplate ) {
		return Ember.View.extend({
			classNames: ['fill'],
			template: Ember.Handlebars.compile( emperorTemplate )
		});
	}
);