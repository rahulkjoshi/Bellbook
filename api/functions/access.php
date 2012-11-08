<?php
// Defines the mysqli database object, and provides convenience functions for running commonly executed queries

/* Require database stuff */
require_once("functions/conf.inc.php");
require_once("functions/connection.php");

/* Defines the $mysqli object */
$mysqli = newConnection( $CFG );

/* Random function */
function test() {
	$query = <<<VEV
    SELECT question_id FROM  `{$prefix}questions`
VEV;
    // Execute the query and grab the data.
    $result = $mysqli->query($query);
}


?>