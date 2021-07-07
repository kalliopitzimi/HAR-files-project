<?php

  include "../config.php";

  session_start();

  if (isset($_SESSION['username']))
  {
    
    $username = $_SESSION['username'];
    
    // STATISTICS: Last upload  
    if (isset($_GET['data']) && ($_GET['data']) == "last_updated")
    {
      //Bring the timestamp from last update 
      $time_query = "SELECT * FROM uploads WHERE username = '$username'";
      $time_result = mysqli_query($con, $time_query);
    
      if ($time_result)
      {
        $row= mysqli_fetch_assoc($time_result);

        if (!isset($row['last_updated'])) // to prevent null values
        {
          echo 'No files found.';
        }
        else echo $row['last_updated'];
      }
    }

    //STATISTICS: Total uploads
    if (isset($_GET['data']) && ($_GET['data']) == "total_uploads")
    {
      //Bring the total number of uploads
      $count_query = "SELECT COUNT( * ) AS upload_counter FROM uploads WHERE username = '$username'";
      $count_result = mysqli_query($con, $count_query);

      if ($count_result)
      {
        $data = mysqli_fetch_assoc($count_result);
        echo $data['upload_counter']; 
      }
    }

    //UPLOAD DATA
    if ( isset($_POST['har_data']) && isset($_POST['users_data']) )
    {
      //har_data ----> to table "har_entries"
      //users_data----> to table "uploads"
       
      //TABLE: UPLOADS
      $users_array = $_POST['users_data'];
      //users_data is already an array, doesn't need json_decode
      $users_ip = $users_array['ip'];
      $users_city = $users_array['city'];
      $users_isp = $users_array['isp'];
      
      //INSERT QUERY
      $users_query = "INSERT INTO uploads (username, ip, city, isp) VALUES ('$username', '$users_ip', '$users_city', '$users_isp')"; 
      $upload_result = mysqli_query($con, $users_query);

      //UPDATE QUERY
      $update_query = "UPDATE uploads SET last_updated = now() WHERE username = '$username'";
      $update_result = mysqli_query($con, $update_query);

      if (!$upload_result || !$update_result )
      {
        echo 'ERROR: '. mysqli_error($con) . '<br>';
      }

      //TABLE: HAR ENTRIES
      $har_json = $_POST['har_data'];
      $har_array = json_decode($har_json, true); //from json to php array

      for ($i = 0; $i< count($har_array); $i++)
      {
        
        $server_ip = $har_array[$i]['serverIPAddress'];

        $latitude = $har_array[$i]['serversLatitude'];
        $longitude = $har_array[$i]['serversLongitude'];
      
        $date = $har_array[$i]['startedDateTime'];
        $wait = $har_array[$i]['timings']['wait'];
     
        $req_method = $har_array[$i]['request']['method'];
        $req_url = $har_array[$i]['request']['url'];

        $req_type = $har_array[$i]['request']['headers']['content_type'];
        $req_cache = $har_array[$i]['request']['headers']['cache_control'];
        $req_pragma = $har_array[$i]['request']['headers']['pragma'];
        $req_expires = $har_array[$i]['request']['headers']['expires'];
        $req_age = $har_array[$i]['request']['headers']['age'];
        $req_last = $har_array[$i]['request']['headers']['last_modified'];
        $req_host = $har_array[$i]['request']['headers']['host'];

        $res_status = $har_array[$i]['response']['status'];
        $res_statustxt = $har_array[$i]['response']['statusText'];

        $res_type = $har_array[$i]['response']['headers']['content_type'];
        $res_cache = $har_array[$i]['response']['headers']['cache_control'];
        $res_pragma = $har_array[$i]['response']['headers']['pragma'];
        $res_expires = $har_array[$i]['response']['headers']['expires'];
        $res_age = $har_array[$i]['response']['headers']['age'];
        $res_last = $har_array[$i]['response']['headers']['last_modified'];
        $res_host = $har_array[$i]['response']['headers']['host'];

        $TTL = calcTTL($res_cache, $res_expires, $res_last);
        
      
        $query= "INSERT INTO har_entries 
                VALUES ('$username','$server_ip', '$latitude', '$longitude', '$date', '$wait',
                        '$req_method', '$req_url', 
                        '$req_type', '$req_cache', '$req_pragma', '$req_expires', '$req_age', '$req_last', '$req_host',
                        '$res_status', '$res_statustxt', 
                        '$res_type', '$res_cache', '$res_pragma', '$res_expires', '$res_age', '$res_last', '$res_host', '$TTL')"; 
        $result = mysqli_query($con, $query);

        if (!$result)
        {
          echo 'ERROR: '. mysqli_error($con) . '<br>';
        }
      }//for
    }
  }//isset username 
  else
  {
    header("Location:/index.html");
  }

  //Function to extract TTL and convert it from seconds to years
  function calcTTL($res_cache, $res_expires, $res_last)
  {
    if (str_contains($res_cache, 'max-age'))
    {
      $TTL = (preg_replace( '/[^0-9]+/', '', $res_cache)) / 31556952 ;
      if (str_contains($res_cache, 'stale'))
      {
        $res_cache = substr( $res_cache, 0, strpos($res_cache, "stale"));
        $TTL = (preg_replace( '/[^0-9]+/', '', $res_cache) )/ 31556952;
      }
    }
    elseif ( $res_expires!= strtotime('0') && $res_last != strtotime('0') && $res_expires>$res_last)
    {
      $TTL = ($res_expires - $res_last) / 31556952;
    }
    return $TTL;
  }

?>