<?php 
    //Validating connection with database
	$con = mysqli_connect('localhost','root','','web');

	if(!$con)
	{
		die("ERROR: Could not connect with database. " . mysqli_connect_error());
    }
?>