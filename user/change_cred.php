<?php 


  include "../config.php";

  //Change username
  if  ( (isset($_POST['username']) && isset($_POST['newusername'])) ) 
  {
    echo phpversion();
    $username = $_POST['username'];
    $newusername = $_POST['newusername'];

    $query = "SELECT * FROM users WHERE Username = '$username' ";
    $result = mysqli_query($con, $query);

    if (mysqli_num_rows($result) > 0) 
    {
      //user found
      $query1 = "SELECT * FROM users WHERE Username = '$newusername' ";
      $result1 = mysqli_query($con, $query1);

      if (mysqli_num_rows($result1) > 0) 
      { 
        //username already exists 
        echo -1;
      }
      else
      {
        //insert new name
        $query2 = "UPDATE users, uploads, har_entries 
                   SET users.Username = '$newusername', 
                       uploads.username = '$newusername',
                       har_entries.username = '$newusername'
                   WHERE users.Username = '$username' AND uploads.username = '$username' 
                   AND har_entries.username = '$username'";
        $result2 = mysqli_query($con, $query2);

        if ($result2)
        {
          session_start();
          $_SESSION['username'] = $newusername; 
          echo 1;
        } 
        
      }

    } else echo 0; //user not found

  }

  //Change password
  if ((isset($_POST['username']) && isset($_POST['oldpassword']) && isset($_POST['newpassword']) && isset($_POST['cpassword'])))
  {

    $username = $_POST['username'];
    $oldpassword = $_POST['oldpassword'];
    $newpassword = $_POST['newpassword'];
    $cpassword = $_POST['cpassword'];

    $query = "SELECT Username FROM users WHERE Username = '$username' && Password = '$oldpassword' ";
    $result = mysqli_query($con, $query);
    
    if (mysqli_num_rows($result) > 0)
    {
      //user found
      $uppercase = preg_match('@[A-Z]@', $newpassword);
      $number = preg_match('@[0-9]@', $newpassword);
      $special_chars = preg_match('@[^\w]@', $newpassword);

      if (!$uppercase|| !$number || !$special_chars || strlen($newpassword) < 8)
      {
        echo -1; //password isn't strong enough
      }
      else if ( !strcmp($oldpassword, $newpassword))
      {
        echo -2; //passwords do not match
      }
      else 
      {
        //password is ok, update it 
        $query1 = "UPDATE users SET Password = '$newpassword' WHERE Password = '$oldpassword'";   
        $result1 = mysqli_query($con, $query1);
               
        if($result1)
        {
          session_start();
          $_SESSION['username'] = $username;
          echo 1;
        }
      }
    }
    else echo 0; //user not found
    
  }
 
?>
