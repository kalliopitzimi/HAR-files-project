<?php

	include "config.php";


	if (isset($_POST['username']) && isset($_POST['password']))
	{
		$username = mysqli_real_escape_string($con, $_POST['username']);
		$password = mysqli_real_escape_string($con, $_POST['password']); 
		
		$query = "SELECT * FROM users WHERE Username = '$username'";
		$result = mysqli_query($con, $query);

		$admin_query = "SELECT * FROM admins WHERE adminname = '$username'";
		$admin_result= mysqli_query($con, $admin_query);

		//User login
		if (mysqli_num_rows($result) == 1)
		{
			$row = mysqli_fetch_assoc($result);
			if($password == $row['Password'])
			{
				session_start();
				$_SESSION['username'] = $username;
				echo 1; //ajax's response = 1, when user has been found
			}
			else echo 0; // ajax's response = 0, when username and password don't match or don't exist
		}
		
		//Admin login
		if (mysqli_num_rows($admin_result) == 1)
		{
			$admin_row = mysqli_fetch_assoc($admin_result);
			if ($password == $admin_row['password'])
			{
				session_start();
				$_SESSION['username'] = $username;
				echo -1; //ajax's response = -1, when admin logs in 
			} 
			else echo 0;// ajax's response = 0, when username and password don't match or don't exist
		}
	}
?>