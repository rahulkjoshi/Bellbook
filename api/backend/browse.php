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
$app->get('/browse/listings/recent/:number', 'getRecentListings');
// GET: retrieve recent listings, passing in the number
$app->get('/browse/listings/:query', 'getSearch');
// GET: retrieve a specific listing
$app->get('/browse/listings/:id', 'getListing');
// GET: retrieve all bids for listings
$app->get('/browse/listings/:id/bids', 'getBidsForListing');




/* ====================
 * API - Implementation
 * ==================== */

// GET: retrieve recent listings, passing in the number
function getRecentListings( $number ) { 

}

function getSearch( $query ) { 
}

function getListing( $listingID ) {

}

function getBidsForListing( $listingID ) {

}


