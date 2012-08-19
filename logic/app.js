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
		jquery: 'libs/jquery-1.7.2.min',
		handlebars: 'libs/handlebars-1.0.0.beta.6',
		ember: 'libs/ember-1.0.pre.min',
		emberrest: 'libs/ember-rest',
		text: 'libs/require/text'
	}
});


// We tell RequireJS to define dependencies (aka load these files!)
// TODO: explain difference between define and require
// In the callback we load our application. TODO: Incorporate the router.
define( 'app', [
	'views/bellbook',
	'jquery',
	'handlebars',
	'ember'
	], 
	/* In RequireJS, this is a callback function that is called when all of ^ finishes loading.
	 * Hence, we put all our app logic in here. The arguments of the function
	 * are the different objects RequireJS loaded for us. */
	function( MainView ) {
		var App = Ember.Application.create({
			VERSION: '1.0',
			rootElement: '#bellbookapp',
			// Extend to inherit outlet support
			ApplicationController: Ember.Controller.extend(),
			ApplicationView: MainView,
			ready: function() {
				this.initialize();
			}
		});

		// Expose the application globally
		return window.BellBook = App;
	}
);

