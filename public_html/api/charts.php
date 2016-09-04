<?php 

// Get our config variable
include('../../config.inc.php');

$dbc = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

$sql = "SELECT tag, count(*) as TagCount 
		FROM movie_tag
		INNER JOIN tags 
		ON tag_id = id 
		GROUP BY tag";

// Run the SQL
$result = $dbc->query($sql);

// If there was a result 
if( $result->num_rows > 0 ) {

	// Prepare the array which will contain out results
	$movie_tags = [];

	// Loop over each result
	while($movie_tag = $result->fetch_assoc()) {
		// Put the tag into the array
		$movie_tags[] = $movie_tag;
	}

	// Convert into JSON
	$movie_Tags_JSON = json_encode($movie_tags);

	// Prepare the header
	header('Content-Type: application/json');

	// Send the data
	echo $movie_Tags_JSON;

}