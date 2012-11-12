<?php

/* 
* $app 
*       -will be defined as the slim object for this to work.
* $mysqli 
*       -will be defined as the database object for this to work
*/


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

// ======= SEARCH/LISTINGS RETRIEVAL ========
// GET: retrieve recent listings, passing in the number, @return list of listings
$app->get('/browse/listings/recent/:number', 'getRecentListings');
// GET: retrieve a list of listings, and books based on the entered query
$app->get('/browse/:query', 'getSearch');
// GET: retrieve a specific listing, @return a listing (w/o list of bids)
$app->get('/browse/listings/:id', 'getListing');
// GET: retrieve all bids for listings, @return a list of bids
$app->get('/browse/listings/:id/bids', 'getBidsForListing');
// GET: retrieve a specific book, @return a book
$app->get('/browse/books/:id:', 'getBook');

/* @return: list of listings
{
 "type": "listings",
 "totalItems": 3,
 "items": [
  {
    ... // See listing object beow
  },
  {
    ... // See listing object beow
  },
  {
    ... // See listing object beow
  }
 ]
}
*/

/* @return: search result
{
 "type": "all",
 "totalItems": 3,
 "items": [
  {
    ... // See book object beow
  },
  {
    ... // See listing object beow
  },
  {
    ... // See listing object beow
  }
 ]
}
*/

/* @return: a listing
{
    "type": "listing",
    "seller": "Chandu",
    "isbn": "9780735619678"
}
*/

// ======= LISTINGS CRUD ========
// There will be an authenticated user context - so that's not an issue
// POST: create a listing, @in listing information
$app->post('/listings/create', 'createListing');
// PUT: update a listing, @in listing information
$app->put('/listings/:listingid/edit', 'editListing');
// DELETE: delete a listing, @in 
$app->put('/listings/:listingid/delete', 'deleteListing');
// POST: create a bid, @in bid information
$app->post('/listings/:listingid/createBid', 'createBidForListing');
// PUT: update a bid, @in bid information
$app->put('/listings/:bidid', 'editBid');
// DELETE: delete a bid, @in 
$app->put('/listings/:bidid/delete', 'deleteBid');


/* ====================
 * API - Implementation
 * ==================== */

// GET: retrieve recent listings, passing in the number
function getRecentListings( $number ) { 
  // Return the $number most recent listings
  // Simple query of the listing table
}

// GET:
// Query can be a user name (return listings the user is selling),
// Book name/keywords, author, ISBN, etc.
function getSearch( $query ) { 
  // Perform a basic search, returning a list of listings, books
  // Use MySQL to perform this search for now, using regex to parse the query
}

// GET: retrieve a specific listing
function getListing( $listingID ) {
  // TODO: Clean up input
  global $mysqli;
  $prefix = $mysqli->prefix;
  $query = <<<VEV
    SELECT * FROM  `{$prefix}listing` WHERE listing_id = {$listingID}
VEV;
  if ($result = $mysqli->query($query)) {
    
  }

}

function getBidsForListing( $listingID ) {

}

function getBook( $bookID ) {
	
} 

function createListing( ) {

}

function editListing( $listingID ) {

}

function deleteListing( $listingID ) {

}

function createBidForListing( $listingID ) {

}

function editBid( $bidID ) {

}

function deleteBid( $bidID ) {

}

