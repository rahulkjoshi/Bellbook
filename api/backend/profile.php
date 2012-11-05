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

// GET: retrieve new user form
$app->get('/user/create/', 'createUserForm( )');
// POST: submit information entered into the form
$app->post('/user/cUsers', 'createUserDB( )');
// GET: retrive existing user information
$app->get('user/view', 'getUserInfo( )');
// GET: retrive the edit existing user form
$app->get('/user/edit/', 'editUserForm( )');
// POST: submit deletion request for user
$app->post('user/delete/', 'deleteUser( )');
// PUT: update the user information
$app->put('user/update/', 'updateUserDB( )');
// GET: retrive the notifications sent to or from the user
$app->get('user/notifications/', 'getUserNotifications( )')

/* ====================
 * API - Implementation
 * ==================== */

// GET: render the new user form
function createUserForm( ) { 
}
// POST: submit informatin entered into the form
function createUserDB( ) { 
}
// GET: retrive existing user information
function getUserInfo( ) {
}
// GET: retrive the edit existing user form
function editUserForm( ){
}
// POST: submit deletion request for user
function deleteUser( ){
}
// PUT: update the user information
function updateUserDB( ){
}
// GET: retrive the notifcations sent to or from the user
function getUserNotifications( ){
}