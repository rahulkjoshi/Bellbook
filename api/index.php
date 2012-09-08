<?php

/**
 * This is the routing file for the API. The frontend asks the backend (us!)
 * for data through the routes/urls we define in this file.
 *
 * Bellbook's API is RESTful. Theoretically any frontend could use it.
 *
 * Note that Bellarmine's servers are (if I remember correctly) on PHP 5.2.1 or so.
 * So keep that in mind with Slim and other frameworks.
 */


/**
 * Step 1: Require the Slim PHP 5 Framework
 *
 * If using the default file layout, the `Slim/` directory
 * will already be on your include path. If you move the `Slim/`
 * directory elsewhere, ensure that it is added to your include path
 * or update this file path as needed.
 */
require 'Slim/Slim.php';

/**
 * Step 2: Instantiate the Slim application
 *
 * Here we instantiate the Slim application with its default settings.
 * However, we could also pass a key-value array of settings.
 * Refer to the online documentation for available settings.
 */
$app = new Slim(array(
    'log.enable' => true,
    'log.path' => './logs',
    'log.level' => 4
));

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

/* 
 * Remember that for books, the isbn13 is treated as the unique book_id
 * and the isbn10 used as a fallback if 13 doesn't exist.
 */

/* ====================
 * API - RESTful data - currently populated with placeholder data
 * ==================== */

//GET: retrieve all listings for isbn (todo make isbn10 compatible)
$app->get('/listings/:isbn', 'getListingsForIsbn');
function getListingsForIsbn( $isbn ) { 

	echo <<<EOD
{
 "type": "listings",
 "totalItems": 2,
 "items": [
  {
    "seller": "Bob the Builder",
    "price": "1999"
  },
  {
    "seller": "Chandu",
    "price": "0"
  }
 ]
}
EOD;

}

//GET: retrieve recent activity objects, specifying the number of objects to retrieve
$app->get('/activity/:number', 'getRecentActivity');
function getRecentActivity( $number ) { 

  echo <<<EOD
{
 "type": "activities",
 "totalItems": 3,
 "items": [
  {
    "type": "newListing",
    "seller": "Bob the Builder",
    "price": "1999",
    "book": {
      "isbn": "9781890132828",
      "title": "Green Grapes of Grendel",
      "imageUrl": "http://ecx.images-amazon.com/images/I/51kR%2BJ1ZcKL._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg"
    }
  },
  {
    "type": "newListing",
    "seller": "Chandu",
    "price": "0",
    "book": {
      "isbn": "9780595465514",
      "title": "Chandu's Handbook to Bellarmine College Prep",
      "imageUrl": "http://ecx.images-amazon.com/images/I/413zLWUs8LL._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg"
    }
  },
  {
    "type": "completedPublicTransaction",
    "seller": "Chandu",
    "buyer": "Bob the Builder",
    "book": {
      "isbn": "9780735619678",
      "title": "Code Complete",
      "imageUrl": "http://ecx.images-amazon.com/images/I/51nWkLCu1SL._BO2,204,203,200_PIsitb-sticker-arrow-click,TopRight,35,-76_AA300_SH20_OU01_.jpg"
    }
  }
 ]
}
EOD;

}

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This is responsible for executing
 * the Slim application using the settings and routes defined above.
 */
$app->run();
