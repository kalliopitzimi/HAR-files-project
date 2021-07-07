<?php

include "../config.php";
session_start();

if (isset($_SESSION['username']))
{
    $admin =  $_SESSION['username'];

    // Chart 2 a
    if (isset($_GET['data']) && ($_GET['data']) == "2a")
    {
        $query1 = "SELECT DISTINCT HOUR(startedDateTime) as hour, AVG(wait) as average, res_content_type as content 
                   FROM har_entries 
                   WHERE res_content_type = 'image/png' || res_content_type = 'text/css' 
                   || res_content_type = 'application/javascript' || res_content_type = 'text/javascript' 
                   GROUP BY content, hour";

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
    
    //Chart 2 b 
    if (isset($_GET['data']) && ($_GET['data']) == "2b")
    {
        $query1 = "SELECT DISTINCT HOUR(startedDateTime) as hour, AVG(wait) as average, DAYNAME(startedDateTime) as day 
                   FROM har_entries 
                   GROUP BY day, hour";
    
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

    //Chart 2 c
    if (isset($_GET['data']) && ($_GET['data']) == "2c")
    {
        $query1 = "SELECT DISTINCT HOUR(startedDateTime) as hour, AVG(wait) as average, method 
                   FROM har_entries 
                   GROUP BY hour, method";
    
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

    //Chart 3 a
    if (isset($_GET['data']) && ($_GET['data']) == "3a")
    {
        $query1 = "SELECT res_content_type, GROUP_CONCAT(TTL) AS data
                   FROM har_entries 
                   WHERE res_content_type = 'application/javascript' 
                    || res_content_type = 'text/css' || res_content_type = 'image/png' 
                    || res_content_type = 'text/javascript' 
                    GROUP BY res_content_type ";

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

    //Chart 3 b
    if (isset($_GET['data']) && ($_GET['data']) == "3b")
    {
        $query1 = "SELECT COUNT(*) total , req_content_type as content
                   FROM har_entries 
                   WHERE req_content_type = 'text/plain' || req_content_type = 'application/json' 
                   GROUP BY req_content_type";

        $result1 = mysqli_query($con, $query1);

        if($result1)
        {
            while ($data1= $result1->fetch_assoc())
            {
                $response[]=$data1;
            }
        }
        $query2 = "SELECT req_content_type as content, 
                    COUNT(*) as counts, res_cache_control as cache_type
                    FROM har_entries 
                    WHERE (res_cache_control LIKE '%max-stale%' || res_cache_control LIKE '%min-fresh%')";

        $result2 = mysqli_query($con, $query2);

        if($result2)
        {
            
            while ($data = $result2->fetch_assoc())
            {
                $response[]=$data;
            }
            
        } 
        
        echo json_encode($response); 
    }

    //Chart 3 c
    if (isset($_GET['data']) && ($_GET['data']) == "3c")
    {
        $query1 = "SELECT COUNT(*) total , res_content_type as content
        FROM har_entries 
        WHERE res_content_type = 'text/plain' || res_content_type = 'text/html' 
        || res_content_type = 'image/gif' || res_content_type = 'image/png' 
        GROUP BY res_content_type";

        $result1 = mysqli_query($con, $query1);

        if($result1)
        {
            while ($data1= $result1->fetch_assoc())
            {
                $response[]=$data1;
            }
        }
        
        $directives = ['%public%', '%private%', '%no-cache%', '%no-store%'];
        $directives2 = ['public', 'private', 'no-cache', 'no-store'];
        for ($i = 0; $i< sizeof($directives); $i++)
        {
            
             $query2 = "SELECT res_content_type as content, COUNT(*) as counts, '$directives2[$i]' as cache_type
                        FROM har_entries 
                        WHERE res_cache_control LIKE '$directives[$i]'
                        GROUP BY res_content_type 
                        HAVING res_content_type = 'text/plain' || res_content_type = 'text/html' || res_content_type = 'image/gif' || res_content_type = 'image/png' ";
           
            $result2 = mysqli_query($con, $query2);

            if($result2)
            {
                
                while ($data = $result2->fetch_assoc())
                {
                    $response[]=$data;
                }
                
            } 
        }
        echo json_encode($response);     
    }
}