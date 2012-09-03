/**
 * ===========================================================================
 * THIS FILE is the (logic) gateway to BellBook.
 * It "requires" all the necessary logic files for the app to run,
 * and instantiates the application.
 *
 * ---------------------------------------------------------------------------
 * Copyright: ©2012 Vervious (Benjamin Chan) All Rights Reserved.
 * 			  Portions ©2012 Your Name Here
 * ---------------------------------------------------------------------------
 * License:   Available via the MIT license. 
 * ===========================================================================
 */

// Modified 08-19-2012 by Vervious
 

// BellBook uses RequireJS to load files (see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth)
// The following defines libraries as shortcut aliases (so we don't have to type them out every time)
require.config({
	baseUrl: '', // relative to app.js
	paths: {
		handlebars: 'logic/libs/handlebars-1.0.0.beta.6',
		jquery: 'logic/libs/jquery-1.7.2.min',
		ember: 'logic/libs/ember-1.0.pre.min',
		emberrest: 'logic/libs/ember-rest',
		text: 'logic/libs/require/text'
	},
	// So, the problem is that ember needs some other files to be loaded before it itself is loaded
	// We are using requireJS, which loads files in different orders or simultaneously
	// In files we code we just "define(,[...])"" other files as a dependency
	// But it is not a good idea to manually modify ember.js because we'd have to modify for every update
	// ∴ (ergo) instead we use 'shim' to directly tell RequireJS that ember has dependencies (Handlebar, jQuery)
	shim: {
		'ember': {
	        // Ember needs jQuery and Handlebars...
	        deps: ['jquery', 'handlebars'],
	        // Because we used shim to load Ember as a module, we need to expose the Ember global variable. We do that here.
	        exports: 'Ember'
	    }
    }
});

// ===================================================================
// For every "module", 
// There is a Controller, View, and Handlebars file with the same name
// Controllers are a little shoddy in Ember; rather, the views
// are more of a controller/presenter hybrid (sort of like NSViewController)
// ===================================================================
// So far, the module list (architecture)
// > Emperor
//		> Start
//  	> Home (todo)
//


// We tell RequireJS to define dependencies (aka load these files!)
// Define "defines" a reusuable module, like the app, or a view, etc. Require simply requires a file.
// In the callback we load our application. TODO: Incorporate the router.
define( 'app', [
	// dependencies
	'logic/router',
	'logic/controllers/emperor',
	'logic/views/emperor',
	'logic/controllers/start',
	'logic/views/start',
	'ember'
	], 
	/* In RequireJS, this is a callback function that is called when all of ^ finishes loading.
	 * Hence, we put all our app logic in here. The arguments of the function
	 * are the different objects RequireJS loaded for us. */
	function( 
		MainRouter, 
		EmperorController, EmperorView, 
		StartController, StartView
	 ) {  // NOTE that these are CLASSES (as evidenced by the Capitalized names)
		BellBook = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#bellbookapp',
			// Establish our... Navigator!
			Router: MainRouter,

			/* REGISTER all the classes we will be using */
			/* Ember makes it a pain to dynamically add classes, constantly saying that they're undefined,
			 * so we might as well do it here. */

			// Extend to inherit outlet support
			// The emperor/root object (super duper rendering context)
			// Note that we are passing in CLASSES, not objects
			// Ember will instantiate these for us
			ApplicationController: EmperorController,
			ApplicationView: EmperorView, // ApplicationView is necessary for Ember to function

			// Start screen
			StartController: StartController,
			StartView: StartView,

			ready: function() {
				// Start the app and load all resources
				this.initialize();
			}
		});

		// Expose the application globally
		return window.BellBook = BellBook;
	}
);

