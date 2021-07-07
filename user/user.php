<?php

  include "../config.php";

  session_start();

  //To bring username in HTML 
  if (isset($_SESSION['username']))
  {
    $username = $_SESSION['username'];
  }
  else
  {
    header("Location:../index.html");
  }

?>


<!DOCTYPE html>
<html lang=en>

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css">
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
    <script src="http://leaflet.github.io/Leaflet.markercluster/example/realworld.10000.js"></script>
    <script src="user_queries.js"></script>
    <script src="change_cred.js"></script>
    <script src="../leaflet-heat.js"></script>
    <title>User Menu</title>
  </head>

  <body>
  <div>

      <div class="appbar">
        <div class="appbar-inner" style="display:inline-block; padding:10px">
        <h1 align="left" style="margin-left:20px;color:white;">Welcome <span class="nameVariable"> <?php echo $username ?> !</span></h1> </div>
        
        </div>
     </div>
     <div class="tab">
      <button class="tablinks" onclick="openOpt(event, 'firstBox')" id="defaultOpen">Upload data</button>
      <button class="tablinks" onclick="openOpt(event, 'secondBox')">Statistics</button>
      <button class="tablinks" onclick="openOpt(event, 'thirdBox')">Change Credentials</button>
      <button class="tablinks" onclick="openOpt(event, 'fourthBox')">User Map</button>
     </div>

     <a href = "../logout.php" align="right " id="logOut" ><h3 style="padding-right:20px ">Log out</h3></a>

     <div id="firstBox" class="tabcontent">
          <div class="section1-1">
            <h3>Please select a .har file:</h3>
            <input type="file" id="myfiles" multiple/>
            <button id = "upload-btn">Upload</button><br><br>
            <div id="message"></div>
          </div>

          <div class="section1-2" style="display:inline-block; width:60%">
            <div id="leftS1" align="left" style="margin:0% ;width:40% ; float:left"> 
              <h3> Download the updated .json </h3>
              <button id="download">Download</button> 
            </div>
            <div style="margin:0px;float:center;display:inline-block;width:6%">
            <h3> OR </h3> </div>
        
            <div id="rightS1" align="right" > 
              <h3> Upload it on the server </h3>
              <button id="upload" >Upload to server</button>
              <div id="server"></div><br><br><br><br><br>
            </div>
            
            </div>
          </div>
    </div>

    <div id="secondBox" class="tabcontent">
        <h3>Your last HAR upload was at: </h3> <div id="display1"></div>
            <button id="btn1">Display</button><br><br>

        <h3>Total files uploaded: </h3>
         <div id="display2"></div>
        <button id="btn2">Display</button><br><br>
      
      </div>

    <div id="thirdBox" class="tabcontent">
      <div class="section3-1" style="display:inline-block; width:60%">
        <div id="leftS3" align="left" style="margin:0% ;width:26% ; float:left">
          <h3>Change your username</h3>

          <input type="text" placeholder="Username" id="username"><br>
          <input type="text" placeholder="New Username" id="newusername"><br>
          <div id="user-message" style="color: rgb(155, 1, 1); font-size: medium;"></div>

          <button id="usr-sbt">Submit</button><br>
        </div>
        <div id="rightS3" align="right" style="margin:0% ;width35% ; float:right">
          <h3>Change your password</h3>
          <input type="text" placeholder="Username" id="username1"><br>
          <input type="password" placeholder="Old Password" id="oldpassword"><br>
          <input type="password" placeholder="New Password" id="newpassword"><br>
          <input type="password" placeholder="Confirm Password" id="cpassword"><br>
          <div id="pass-message" style="color: rgb(155, 1, 1); font-size: medium;"></div>

          <button id="pass-sbt">Submit</button>
        </div>
      </div>
    </div>
    <div id="fourthBox" class="tabcontent"> 
      <h3>User Map</h3>
      <button id="display">Display map</button><br>
      <div id="map"></div>
      
      
      <script>
        //LOAD MAP
        var geo = new Array();
        $(document).ready(function()
        {
          $("#display").click(function()
          {
            $.ajax({
              type: "GET",
              url: "user_map.php",
              data: { data: "map"},
              success:function(response)
              {
                
                //Process db data
                var db_data = JSON.parse(response);
                for (var i=0; i<db_data.length; i++)
                {
                  geo[i] = [Number(db_data[i].lat), Number(db_data[i].lon), 10];
                }

                //Initialize map
                var map = L.map('map').setView([38.247779846191, 21.742219924927], 10);

                //Tiles
                var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                }).addTo(map);

                //Load heats
                var heat = L.heatLayer(geo, {radius: 25}).addTo(map);
                map.addLayer(heat); 
              }
            });
          });
        });
      </script>
    
    </div>

</div>

  <script>
    function openOpt(evt, optionName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(optionName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpen").click();
    </script>
      
  </body>
</html>