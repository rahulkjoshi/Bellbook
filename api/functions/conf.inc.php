<?php
	unset($CFG);

	// Do not commit your information to origin
	$CFG = new stdClass();
	$CFG->host = 'localhost';
	$CFG->loginID = 'user';
	$CFG->pass = 'password';
	$CFG->database = 'database_name';
	$CFG->prefix = 'bcrj_';
?>