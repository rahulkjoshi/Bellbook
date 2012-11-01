<?php

// $app will be defined as the slim object for this to work.

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, and `Slim::delete`
 * is an anonymous function. If you are using PHP < 5.3, the
 * second argument should be any variable that returns `true` for
 * `is_callable()`. An example GET route for PHP < 5.3 is:
 *
 * $app = new Slim();
 * $app->get('/hello/:name', 'myFunction');
 * function myFunction($name) { echo "Hello, $name"; }
 *
 */

/* ====================
 * API - RESTful data - CRUD
 * ==================== */

// GET: retrieve recent listings, passing in the number
$app->get('/browse/recent/:number', 'getRecentListings');
// GET: retrieve recent listings, passing in the number
$app->get('/browse/:query', 'getSearch');




/* ====================
 * API - Implementation
 * ==================== */

// GET: retrieve recent listings, passing in the number
function getRecentListings( $number ) { 
}

function getSearch( $query ) { 
}
