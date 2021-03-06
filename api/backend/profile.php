<?php

/* 
*	$app 
* 	  	-will be defined as the slim object for this to work.
*  	$mysqli 
*		-will be defined as the database object for this to work
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

// GET: retrieve new user form
$app->get('/user/create/', 'createUserDB');
// POST: submit information entered into the form
$app->get('/user/view/:uid', 'getUserInfo');
// GET: retrive the edit existing user form
$app->get('/user/edit/:uid', 'editUserForm');
// POST: submit deletion request for user
$app->post('/user/delete/:uid', 'deleteUser');
// PUT: update the user information
$app->put('/user/update/:uid', 'updateUserDB');
// GET: retrive the notifications sent to or from the user
$app->get('/user/notifications/:uid', 'getUserNotifications')


/* ====================
 * API - Implementation
 * ==================== */

// POST: submit informatin entered into the user creation form
function createUserDB( ) { 
}
// GET: retrive existing user information
function getUserInfo($uid) {
}
// GET: retrive the edit existing user form
function editUserForm($uid){
}
// POST: submit deletion request for user
function deleteUser($uid){
}
// PUT: update the user information
function updateUserDB($uid){
}
// GET: retrive the notifcations sent to or from the user
function getUserNotifications($uid){
}
