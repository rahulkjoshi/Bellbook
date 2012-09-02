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
	baseUrl: 'logic/',
	paths: {
		handlebars: 'libs/handlebars-1.0.0.beta.6',
		jquery: 'libs/jquery-1.7.2.min',
		ember: 'libs/ember-1.0.pre.min',
		emberrest: 'libs/ember-rest',
		text: 'libs/require/text'
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


// We tell RequireJS to define dependencies (aka load these files!)
// Define "defines" a reusuable module, like the app, or a view, etc. Require simply requires a file.
// In the callback we load our application. TODO: Incorporate the router.
define( 'app', [
	// dependencies
	'router',
	'views/bellbook',
	'ember'
	], 
	/* In RequireJS, this is a callback function that is called when all of ^ finishes loading.
	 * Hence, we put all our app logic in here. The arguments of the function
	 * are the different objects RequireJS loaded for us. */
	function( mainRouter, bellbookMainView ) {
		App = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#bellbookapp',
			// Establish our... Navigator!
			Router: mainRouter,
			// Extend to inherit outlet support
			ApplicationController: Ember.Controller.extend(),
			ApplicationView: bellbookMainView
		});


		// Expose the application globally
		return window.BellBook = App;
	}
);

