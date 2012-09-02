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
define('views/emperor', [
		'ember'
	],
	/**
	 * Main application view.
	 * (Build and create the main view of our application)
	 *
	 * @returns Class
	 */
	function() {
		return Ember.ContainerView.extend({
			childViews: [ 'inputView' ],
			inputView: Ember.TextField.create({
				placeholder: 'ISBN13',
				elementId: 'isbn-input-field',
				insertNewline: function() {
					var value = this.get( 'value' );
					if ( value ) {
						alert("value: " + value);
					}
				}
			})
		});
	}
);