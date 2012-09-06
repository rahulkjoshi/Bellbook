/**
 * ===========================================================================
 * Displays a list of books.
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 09-04-2012 by Vervious
 
// Ask for dependencies...
define('logic/views/list', [
		// Load as text/string since it's not javascript
		'text!display/templates/list.handlebars',
		'ember'
	],
	function( listTemplate ) {
		return Ember.View.extend({
			template: Ember.Handlebars.compile( listTemplate ),
		});
	}
);