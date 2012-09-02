/**
 * ===========================================================================
 * HI. I tell you where to go.
 *
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 08-21-2012 by Vervious

/* Informational read: http://codebrief.com/2012/07/anatomy-of-an-ember-dot-js-app-part-i-redux-routing-and-outlets/ */
 
// Define a module, with dependencies...
// If you're still not getting the hang of these modules, ask me questions! (Ben)
// Read all comments to learn about how routers work.
define('router', 
	// dependencies
	['ember'],
	function() {
		// In essence, the purpose of a router in a webapp is to assign URLS to each page displayed
		// so that users can link their friends and have the same things appear, etc.
		var appNavigator = Ember.Router.extend({
			// Here you encounter what is known as "States"
			// Read      <<<http://codebrief.com/2012/03/make-the-most-of-your-routes/>>>      before continuing.
			root: Ember.Route.extend({
				doHome: function(router, event) {
			        router.transitionTo('index');
			    },
				// The first page most visitors will encounter; the home page; the isbn enter page
				index: Ember.Route.extend({
					route: '/',
					index: Ember.Route.extend ({
						route: '/'
					}),
					isbnChosen: Ember.Route.extend ({
						route: '/:isbn',
						connectOutlets: function(router) {
							
						}
					}),
					// When we first enter... this function is called
					enter: function(router) {
			          	console.log("entering root.home from", router.get('currentState.name'));
			        },
			        // When we have fully entered this state/route, we connect stuff
			        connectOutlets: function(router) {

			          	var controller = router.get( 'applicationController' );
			        }
				})
			})
		});
		return appNavigator;
	}
);


