<?php

include "../config.php";
session_start();

if (isset($_SESSION['username']))
{
    $admin =  $_SESSION['username'];
   
    if (isset($_GET['data']) && ($_GET['data']) == "map")
    {
        $query1 = "SELECT serverIPAddress as IP, latitude as lat, longitude as lon
                    FROM har_entries";
         
        $result1 = mysqli_query($con, $query1);

        if($result1)
        {
            $response = [];
            while ($data = $result1->fetch_assoc())
            {
                $response[]=$data;
            }
            echo json_encode($response);
        }
    }

}