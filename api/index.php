<?php

/* Require database stuff */
require_once("functions/conf.inc.php");
require_once("functions/connection.php");


/**
 * This is the routing file for the API. The frontend asks the backend (us!)
 * for data through the routes/urls we define in this file.
 *
 * Bellbook's API is RESTful. Theoretically any frontend could use it.
 *
 * Note that Bellarmine's servers are (if I remember correctly) on PHP 5.2.1 or so.
 * So keep that in mind with Slim and other frameworks.
 */

$mysqli = newConnection( $CFG );

/**
 * Step 1: Require the Slim PHP 5 Framework
 *
 * If using the default file layout, the `Slim/` directory
 * will already be on your include path. If you move the `Slim/`
 * directory elsewhere, ensure that it is added to your include path
 * or update this file path as needed.
 */
require 'vendors/Slim/Slim.php';

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

// /browse urls
require_once( 'backend/browse.php' );
// /profile urls
require_once( 'backend/profile.php' );


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This is responsible for executing
 * the Slim application using the settings and routes defined above.
 */
$app->run();
