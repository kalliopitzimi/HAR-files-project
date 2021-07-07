<!DOCTYPE html>
<html lang=en>
 
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script> 
    <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
    <script src="http://leaflet.github.io/Leaflet.markercluster/example/realworld.10000.js"></script>
    <script src="admin_queries.js"></script> 
    <script src="admin_charts.js"></script> 
    <script src="mycharts.js"></script>
    <script src="../leaflet-heat.js"></script>
    <title>Admin Menu</title>
  </head>
   <body> 
      <div class="appbar">
        <div class="appbar-inner" style="display:inline-block; padding:10px">
        <h1 align="left" style="margin-left:20px;color:white;">Welcome admin!</h1> </div>
      </div>
      <div class="tab">
        <button class="tablinks" onclick="openOpt(event, 'firstBox')" id="defaultOpen">Basic Information</button>
        <button class="tablinks" onclick="openOpt(event, 'secondBox')">Response Time Analysis</button>
        <button class="tablinks" onclick="openOpt(event, 'thirdBox')">HTTP Header Analysis</button>
        <button class="tablinks" onclick="openOpt(event, 'fourthBox')">Admin Map</button>
      </div> 
      <a href = "../logout.php" align="right " id="logOut"><h3 style="padding-right=10px">Log out</h3></a>
      
      
      <div id="firstBox" class="tabcontent"> 
      <div class="section3-1">
        <div style="display:inline-block; width:80%"> 
         <div > <h3>Total number of registered users: </h3> </div> <div id = "display1"></div> 
          <button id="button1"  > Display </button><br>
          </div>
          <h3>Total number of entries per request method: </h3> <div id = "display2"></div> 
          <button id="button2"> Display </button><br>
        
        <div style="display:inline-block; width:60%">
          <h3>Total number of entries per response status:</h3> <div id = "display3"></div> 
          <button id="button3"> Display </button><br>
          <h3>Total number of unique domains:</h3> <div id = "display4"></div> 
          <button id="button4"> Display </button><br>
        </div>
        <div style="display:inline-block; width:60%">  
          <h3>Total number of unique ISPs:</h3> <div id = "display5"></div>
          <button id="button5"> Display </button><br>
          <h3>Average age of web objects per content type:</h3><div id = "display6"></div> 
          <button id="button6"> Display </button><br>
        </div>
               
        </div>
      </div>
      <div id="secondBox" class="tabcontent">
          <h3>Response time analysis per content type</h3>
            <button id="canvas1"> Display</button><br>
            <canvas id="chart_2_a" width="800" height="400"></canvas>

            <h3>Response time analysis per day</h3>
            <button id="canvas2"> Display</button><br>
            <canvas id="chart_2_b" width="800" height="400"></canvas>

            <h3>Response time analysis per HTTP request method</h3>
            <button id="canvas3"> Display</button><br>
            <canvas id="chart_2_c" width="800" height="400"></canvas>
      </div>
      <div id="thirdBox" class="tabcontent"> 
        <h3>TTL Histogram</h3>
        <button id="canvas4"> Display</button><br>
        <canvas id="chart_3_a" width="800" height="400"></canvas> <br>

        <h3>Max-stale/min-fresh</h3>
        <button id="canvas5"> Display </button><br>
        <canvas id="chart_3_b" width="800" height="400"></canvas>

        <h3>Cacheability</h3>
        <button id="canvas6"> Display </button><br>
        <canvas id="chart_3_c" width="800" height="400"></canvas>
      </div>
      <div id="fourthBox" class="tabcontent"> 
        
        <button id="display">Display map</button><br>
        <div id="map"></div>
        <script>
          //LOAD MAP
          var geo = new Array;
          $(document).ready(function()
          {
            $("#display").click(function()
            {
              $.ajax({
                type: "GET",
                url: "admin_maps.php",
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
                  
                  //Load heat
                  var heat = L.heatLayer(geo, {radius: 25}).addTo(map);
                  map.addLayer(heat);
                }
              });
            });
          });
        </script>
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
      </div>
   </body>
</html>