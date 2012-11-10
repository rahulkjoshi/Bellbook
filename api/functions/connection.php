<?php

	// Creates a new connection using the configuration stored in $CFG
	// @return a new "mysqli" object
	function newConnection( $CFG ) {
		

	    // Store credentials in variables
	    $host = $CFG->host;
	    $login = $CFG->loginID;
	    $password = $CFG->pass;
	    $database = $CFG->database;
	    $prefix = $CFG->prefix;

	    // Creates mySQL object for data query
	    $mysqli = new mysqli($host, $login, $password, $database);
	    
	    // Attempt to connect to mySQL database, and catches errors instead of crashing
	    if ($mysqli->connect_errno) {
	      die('Connect Error: ' . $mysqli->connect_error);
	    }

	    $mysqli->prefix = $prefix; // Store our prefix in a custom manner

	    return $mysqli;

	}
?>