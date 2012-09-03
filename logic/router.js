/**
 * ===========================================================================
 * HI. I tell you where to go, and I load all the views.
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
define('logic/router', 
	// dependencies
	['ember'],

	function() {

		// In essence, the purpose of a router in a webapp is to assign URLS to each page displayed
		// so that users can link their friends and have the same things appear, etc.
		var appNavigator = Ember.Router.extend({
			// Here you encounter what is known as "States"
			// Read <<<http://codebrief.com/2012/03/make-the-most-of-your-routes/>>> for the basic concepts before continuing.
			// Note that only leaf nodes are routable
			root: Ember.Route.extend({
				doHome: function(router, event) {
			        router.transitionTo('index');
			    },
				// The entry point (usually); BellBook redirects to either start, or home
				// based on whether the user has any current transactions.
				// Emperor is already connected for us.
				index: Ember.Route.extend({
					route: '/',
					redirectsTo: 'startHome',
					/*enter: function(router) {
				            var shouldDisplayStart = true;
				            Ember.run.next(function() {
				                if (shouldDisplayStart) {
				                    router.transitionTo('start');
				                } else {
				                    router.transitionTo('home');
				                }
				            });
				        },*/
					// Only leaf nodes are routable
					// Child nodes,
					// When we first enter... this function is called
					enter: function(router) {
			          	console.log("entering root.home from", router.get('currentState.name'));
			        },
			        // When we have fully entered this state/route, we connect stuff
			        connectOutlets: function(router) {
			          	var controller = router.get( 'applicationController' );
			        }
				}),
				// The "start" route - there's a naming conflict hence the non-matching name
				startHome: Ember.Route.extend ({
					route: '/start',
					connectOutlets: function(router) {
						// Put "start" view (with the ISBN box) into the emperor view
						/* What connectOutlet does:

						 * Look for a (usually previously created) controller corresponding to the name. In this case, startController.
						 * Instantiate a view corresponding to the name. In this case, create an instance of StartView.
						 * Set the view property of the controller to the newly instantiated view.

						*/
						var parentController = router.get('applicationController');
						// Load the controller and create the outlets
						router.addControllerAndView('start', parentController, null);
					}
				}),
				// Displayed to show a user's own transactions... like a dashboard
				home: Ember.Route.extend ({
					route: '/home',
					connectOutlets: function(router) {
						
					}
				}),
				// Book: Shows the book with the entered ISBN
				book: Ember.Route.extend ({
					route: '/book',
					bookid: Ember.Route.extend ({
						route: '/:isbn13',
						connectOutlets: function(router) {
						}	
					})
				})
			}),

			/* Utility Functions */
			// Lazily load a controller, looking in the normal places
			addControllerAndView: function ( name, parentController, context ) {
				router = this; // After all, we are the router

				require([ "logic/controllers/" + name, "logic/views/" + name ], 
					function ( NameController, NameView ) {
						var newController = router.get('applicationController');
						if (typeof newController == "undefined") {
							newController = NameController.create() 
			                newController.setProperties({
			                    target: router,
			                    controllers: router
			                });
			                router.set( name + 'Controller', newController );
			            }
		                parentController.connectOutlet({
		                	viewClass: NameView,
		                	controller: newController,
		                	context: context
		                });
		            }
		        );
			}
		});

		
		return appNavigator;
	}
);


