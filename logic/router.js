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

// Modified 09-05-2012 by Vervious

/* Informational read: http://codebrief.com/2012/07/anatomy-of-an-ember-dot-js-app-part-i-redux-routing-and-outlets/ */
 
// Define a module, with dependencies...
// If you're still not getting the hang of these modules, ask me questions! (Ben)
// Read all comments to learn about how routers work.
// The Ember documentation is pretty good concerning Router - keep it open while you work.
define('logic/router', 
	// dependencies
	['ember'],

	function() {

		// In essence, the purpose of a router in a webapp is to assign URLS to each page displayed
		// so that users can link their friends and have the same things appear, etc.
		var appNavigator = Ember.Router.extend({
			enableLogging: true,
			// Here you encounter what is known as "States"
			// Read <<<http://codebrief.com/2012/03/make-the-most-of-your-routes/>>> for the basic concepts before continuing.
			// Note that only leaf nodes are routable
			// Note that there is a "root" state, "start(Home)" state, "book" state, etc.
			root: Ember.Route.extend({
				doHome: function(router, event) {
			        router.transitionTo('home');
			    },
			    loadStart: function(router, event) {
			        router.transitionTo('startHome');
			    },
			    // Load the book with the given context, with context in form {isbn: value} (Called an object literal)
			    loadBookForIsbn: function(router, context) {
			        router.transitionTo('books.book.index', context);
			    },
				// The entry point (usually); BellBook redirects to either start, or home
				// based on whether the user has any current transactions. (todo)
				// Emperor is already connected for us.
				index: Ember.Route.extend({
					route: '/',
					redirectsTo: 'startHome'
					// Only leaf nodes are routable
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
						 * If there's a context argument (the last argument), sets context as createdController.content, which is
						 * then accessible as {{content}} in the view template.
						*/
						// Get the emperorController
						var parentController = router.get('applicationController');
						parentController.set("inputAreaType", "full"); // make the input area become full screen
						// Load the controller and connect the outlets defined by the emperorControlelr
												console.log("hi");

						parentController.disconnectOutlet('inputArea'); // remove the extraneous outlets that should no longer be displayed
						router.addControllerAndView('mainArea','start', parentController, null, null, null);
					}
				}),
				// Displayed to show a user's own transactions... like a dashboard
				home: Ember.Route.extend ({
					route: '/home',
					connectOutlets: function(router) {
						
					}
				}),
				// Books: Shows all books
				books: Ember.Route.extend ({
					route: '/books',
					index: Ember.Route.extend({
						route: '/',
						redirectsTo: 'browseall'
					}),
					// Book: Shows the book with the entered ISBN
					// Context: {isbn: value}
					book: Ember.Route.extend ({
						route: '/:isbn', // Ember Router automatically serializes :isbn into the context {isbn: value}
						loadList: function(router, event) {
					        router.transitionTo('list');
					    },
						// Connect the book and controller
						connectOutlets: function(router, context) {
							// Load the controller and connect the outlets defined by the emperorControlelr
							var parentController = router.get('applicationController');
							parentController.set("isbnInput", context.isbn); // Have the search box contain the isbn 
							router.addControllerAndView('inputArea', 'book', parentController, context, null, null);
						},
						// (remember that you can only load leaf nodes/routes)
						index: Ember.Route.extend({
							route: '/',
							connectOutlets: function (router) {
								var parentController = router.get('applicationController');
								parentController.set("inputAreaType", "mid"); // make the input area smaller, making room for the book view
								parentController.disconnectOutlet('mainArea'); // remove the start area
							}
						}),
						// List the available books
						list: Ember.Route.extend({
							route: '/list',
							// This may be called before the bookController has even loaded (because it's compeltely asynchronous)
							connectOutlets: function(router, context) {
								// Load the controller and connect the outlets defined by the bookController
								var parentController = router.get('applicationController');
								var bookController = router.get('bookController');
								if (parentController && bookController) {
									parentController.set("inputAreaType", "basic"); // // Shrink the search bar and book info to the sidebar

									// We pass parentController in as additional context (arguments 4 and 5), because for listController  
									// we need to bass it a bindingsSource (the bookController, so it knows what book to handle),
									// and we can't use the normal "context" because that propagates to listController.content
									// and listController.content has to be an array because listController is an ArrayController.
									router.addControllerAndView('mainArea', 'list', parentController, null, 'bindingSource', bookController);
									router.removeObserver('bookController', this, 'connectOutlets'); // does nothing if we aren't observer
								}
								else {
									// conneectOutlets failed, probably because book's connectOutlets has yet to finish 
									// and bookController does not exist,
									// because of asynchronous requireJS loading
									// if that's the case, make it so that connectOutlets() is called again
									// when bookController exists, by observing when the property changes
									// Observe router.bookController, calling this.connectOutlet when it changes.
									router.addObserver('bookController', this, 'connectOutlets');
								}
							}
						}),
					})
				}),
				// Browse All: Shows all offers, filterable
				browseall: Ember.Route.extend ({
					route: '/browseall' // TODO: implement
				})
			}),

			/* Utility Functions */
			// Lazily load a controller, looking in the normal places
			// @params
			// outletName: 					name of outlet to connect
			// name: 						name of controller/view to load.
			// parentController: 			the controller who's outlet we are going to insert the new controllers into
			// context: 					object/data to set as 'newController.content'
			// additionalContextProperty: 	name of property where to save additional context/pass additional data to newController
			// additionalContextValue: 		additional context to pass to newController, set as 'additionalContextValue.additionalContextProperty'
			addControllerAndView: function ( outletName, name, parentController, context, additionalContextProperty, additionalContextValue ) {
				router = this; // After all, we are the router
				require([ "logic/controllers/" + name, "logic/views/" + name ], 
					function ( NameController, NameView ) {
						if (NameController && NameView) {
							var newController = router.get(name + 'Controller');
							if (typeof newController == "undefined") {
								newController = NameController.create();
				                newController.setProperties({
				                    target: router,
				                    controllers: router
				                });
				                router.set( name + 'Controller', newController );
				            }
				            if (!outletName) outletName = "view";
				            // Connect outlets and pass normal context
			                parentController.connectOutlet({
			                	viewClass: NameView,
			                	outletName: outletName,
			                	controller: newController,
			                	context: context
			                });
			                // pass addtional context
			                if (additionalContextProperty && additionalContextValue) {
				                newController.set(additionalContextProperty, additionalContextValue);
				            }

		           		}
		           		else {
		           			console.log("Missing Controller or View of type: "+name);
		           		}
		            }
		        );
			}
		});

		
		return appNavigator;
	}
);

// NOTE about memory management - I'm not sure if we have to manually destroy the controllers that we create. TODO: figure out if we have to.




