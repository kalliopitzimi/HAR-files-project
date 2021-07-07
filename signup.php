<?php

    include "config.php";

	if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['cpassword']))
	{
    
        $username = mysqli_real_escape_string($con, $_POST['username']);
        $email = mysqli_real_escape_string($con, $_POST['email']);
        $password = mysqli_real_escape_string($con, $_POST['password']);
        $cpassword= mysqli_real_escape_string($con, $_POST['cpassword']);

        
        $query1= "SELECT * FROM users WHERE Username='$username'";
        $result1 = mysqli_query($con, $query1);

        if (mysqli_num_rows($result1) > 0)
        {
            echo -2; //given username already exists in table "users"
        }
        else
        {

            $uppercase = preg_match('@[A-Z]@', $password);
            $number = preg_match('@[0-9]@', $password);
            $special_chars = preg_match('@[^\w]@', $password);

            if(!$uppercase|| !$number || !$special_chars || strlen($password) < 8) 
            {
                echo -1; //password isn't strong enough
            }
            else
            {
                //$password = password_hash($password, PASSWORD_DEFAULT);
                $query2 = "INSERT INTO users (Username, Email, Password) values  ('$username', '$email', '$password')";
                $result2 = mysqli_query($con, $query2);

                if ($result2)
                {
                    session_start();
                    $_SESSION['username'] = $username;
                    echo 1; //user has been added in the table 
                    
                }
                else echo 0;  // an error occured while inserting user 
            }
        }  
	}
?>