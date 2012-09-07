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

/* ====================
 * API - RESTful data
 * ==================== */

//GET: retrieve all listings for isbn (todo make isbn10 compatible)
$app->get('/listings/:isbn', 'getListingsForIsbn');
function getListingsForIsbn( $isbn ) { 

	echo <<<EOD
{
 "kind": "listings",
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

/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This is responsible for executing
 * the Slim application using the settings and routes defined above.
 */
$app->run();
