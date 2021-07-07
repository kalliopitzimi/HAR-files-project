/*** Chart 2a ***/
var app_js = new Array(23).fill(0);
var text_css = new Array(23).fill(0);
var image_png = new Array(23).fill(0);
var text_js = new Array(23).fill(0);

$(document).ready(function() 
{
  $("#canvas1").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "2a"},
      success:function(response)
      {
        // 1) PROCESS DATA FROM DB
        var db_data = JSON.parse(response); //db_data = response from db
        for (var i=0;i<db_data.length; i++)
        {
          for (var j = 0; j<24; j++)
          {
            if (db_data[i].content == 'application/javascript' && ( j == db_data[i].hour))
            {
              app_js[j] = db_data[i].average;
            }
            else if (db_data[i].content == 'text/css' && ( j == db_data[i].hour))
            {
              text_css[j]= db_data[i].average;
            }
            else if (db_data[i].content == 'text/css' && ( j == db_data[i].hour))
            {
              image_png[j] = db_data[i].average;
            }
            else if (db_data[i].content == 'text/javascript' && ( j == db_data[i].hour))
            {
              text_js[j] = db_data[i].average;
            }
          }
        }
        //2)CALL CHART
        chart_2_a(app_js, text_css, image_png, text_js);
      }//response
    });
  });
});


/*** Chart 2 b ***/
var mon = new Array(23).fill(0);
var tue = new Array(23).fill(0);
var wen = new Array(23).fill(0);
var thu = new Array(23).fill(0);
var fri = new Array(23).fill(0);
var sat = new Array(23).fill(0);
var sun = new Array(23).fill(0);

$(document).ready(function() 
{
  $("#canvas2").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "2b"},
      success:function(response)
      {
        // 1) PROCESS DATA FROM DB
        var db_data = JSON.parse(response); //db_data = response from db
        for (var i = 0; i<db_data.length; i++)
        {
          for (var j = 0; j<24; j++)
          {
           if (db_data[i].day == 'Monday' && ( j == db_data[i].hour) )
           {
            mon[j] = db_data[i].average;
           }
           else if (db_data[i].day == 'Tuesday' && ( j == db_data[i].hour))
           {
            tue[j] = db_data[i].average;
           }
           else if (db_data[i].day == 'Wednesday' && ( j == db_data[i].hour))
           {
            wen[j] = db_data[i].average;
           }
           else if (db_data[i].day == 'Thursday' && ( j == db_data[i].hour))
           {
            thu[j] = db_data[i].average;
           }
           else if (db_data[i].day == 'Friday' && ( j == db_data[i].hour))
           {
            fri[j] = db_data[i].average;
           }
           else if (db_data[i].day == 'Saturday' && ( j == db_data[i].hour))
           {
            sat[j] =  db_data[i].average;
           }
           else if (db_data[i].day == 'Sunday' && ( j == db_data[i].hour))
           {
            sun[j] = db_data[i].average;
           }
          }
        }
        //2)CALL CHART
        chart_2_b(mon,tue,wen,thu,fri,sat,sun);
      }//response
    });
  });
});

/*** Chart 2 c  ***/
var get = new Array(23).fill(0);
var post = new Array(23).fill(0);
var head = new Array(23).fill(0);
var del = new Array(23).fill(0);
var options = new Array(23).fill(0);
var put = new Array(23).fill(0);

$(document).ready(function() 
{
  $("#canvas3").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "2c"},
      success:function(response)
      {
        // 1) PROCESS DATA FROM DB
        var db_data = JSON.parse(response); //db_data = response from db
        //console.log(db_data);
        for (var i = 0; i<db_data.length; i++)
        {
          for (var j = 0; j<24; j++)
          {
            if (db_data[i].method == 'GET' && ( j == db_data[i].hour))
            {
              get[j] = db_data[i].average;
            }
            else if (db_data[i].method == 'POST' && ( j == db_data[i].hour))
            {
              post[j]= db_data[i].average;
            }
            else if (db_data[i].method == 'HEAD' && ( j == db_data[i].hour))
            {
              head[j]= db_data[i].average;
            }
            else if (db_data[i].method == 'DELETE' && ( j == db_data[i].hour))
            {
              del[j]= db_data[i].average;
            }
            else if (db_data[i].method == 'OPTIONS' && ( j == db_data[i].hour))
            {
              options[j]= db_data[i].average;
            }
            else if (db_data[i].method == 'PUT' && ( j == db_data[i].hour))
            {
              put[j]= db_data[i].average;
            }
          }
        }
        //2)CALL CHART
        chart_2_c(get,post,head,del,options,put);
      }//response
    });
  });
});

/*** Chart 3 a ***/
var chart_data = new Array();
var dataset= new Array();
var temp= new Array();

$(document).ready(function() 
{
  $("#canvas4").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "3a"},
      success:function(response)
      {
        // 1) PROCESS DATA FROM DB
        db_data = JSON.parse(response); //db_data = response from db:
        for (var i=0; i<db_data.length; i++)
        {
          //chart_data = data from db
          chart_data[i] = JSON.parse("[" + db_data[i].data+ "]"); //convert string to array 
          var temp= [];
          for (var j=0; j<=10; j++)
          {
            temp.push(getOccurrence(chart_data[i], j) );
          }
          dataset[i] = temp; //dataset = how many times a year occurs in chart data
        }
        //2)CALL chart:
        chart_3_a(db_data, chart_data, dataset);
      }//response
    });
  });
}); //document ready, so js runs after the loading of HTML

/*** Chart 3 b ***/
var text = new Array();
var application = new Array();


$(document).ready(function() 
{
  $("#canvas5").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "3b"},
      success:function(response)
      {
        //db_data are split in two mysql queries
        //First *2* entries of db_data is the total number of every content type
        var percent;
        var db_data = JSON.parse(response); //db_data = response from db
        //console.log(db_data);
  
        data_text = new Array(2).fill(0);
        data_application = new Array(2).fill(0);
        
        
        for (var i=2; i<db_data.length; i++)
        {
          if (db_data[i].content == 'text/plain')
          {
            percent = ((db_data[i].counts * 100)/db_data[0].total ).toFixed(2); 
            if (db_data[i].cache_type.inludes("max-fresh")) data_text[0]= percent;
            else if (db_data[i].cache_type.includes("min-fresh")) data_text[1] = percent;
           
          }
          else if (db_data[i].content =='application/json')
          {
            percent = ((db_data[i].counts * 100)/db_data[1].total ).toFixed(2); 
            if (db_data[i].cache_type.inludes("stale")) data_application[0]= percent;
            else if (db_data[i].cache_type.includes("min-fresh")) data_application[1] = percent;
          }
    
        }
        //2)CALL CHART
        chart_3_b(data_text, data_application);
      }
    });
  });
});

/*** Chart 3 c ***/
var img_gif = new Array();
var img_png = new Array();
var text_html = new Array();
var text_plain = new Array();

$(document).ready(function() 
{
  $("#canvas6").click(function() 
  {
    $.ajax({
      type: "GET",
      url: "admin_charts.php",
      data: { data: "3c"},
      success:function(response)
      {
        //db_data are split in two mysql queries
        //First *4* entries of db_data is the total number of every content type
        var percent;
        var db_data = JSON.parse(response); //db_data = response from db
        //console.log(db_data);
  
        data_png = new Array(4).fill(0);
        data_gif = new Array(4).fill(0);
        data_html = new Array(4).fill(0);
        data_plain = new Array(4).fill(0);
        
        for (var i=4; i<db_data.length; i++)
        {
          if (db_data[i].content == 'image/gif')
          {
            percent = ((db_data[i].counts * 100)/db_data[0].total ).toFixed(2); 
            if (db_data[i].cache_type == 'public') data_gif[0]= percent;
            else if (db_data[i].cache_type == 'private') data_gif[1] = percent;
            else if (db_data[i].cache_type == 'no-cache') data_gif[2] = percent;
            else if (db_data[i].cache_type == 'no-store') data_gif[3] = percent;
          }
          else if (db_data[i].content =='image/png')
          {
            percent = ((db_data[i].counts * 100)/db_data[1].total ).toFixed(2); 
            if (db_data[i].cache_type == 'public') data_png[0]= percent;
            else if (db_data[i].cache_type == 'private') data_png[1] = percent;
            else if (db_data[i].cache_type == 'no-cache') data_png[2] = percent;
            else if (db_data[i].cache_type == 'no-store') data_png[3] = percent;
          }
          else if (db_data[i].content == 'text/html')
          {
            percent = ((db_data[i].counts * 100)/db_data[2].total ).toFixed(2); 
            if (db_data[i].cache_type == 'public') data_html[0]= percent;
            else if (db_data[i].cache_type == 'private') data_html[1] = percent;
            else if (db_data[i].cache_type == 'no-cache') data_html[2] = percent;
            else if (db_data[i].cache_type == 'no-store') data_html[3] = percent;
          }
          else if (db_data[i].content == 'text/plain')
          {
            percent = ((db_data[i].counts * 100)/db_data[3].total ).toFixed(2); 
            if (db_data[i].cache_type == 'public') data_plain[0]= percent;
            else if (db_data[i].cache_type == 'private') data_plain[1] = percent;
            else if (db_data[i].cache_type == 'no-cache') data_plain[2] = percent;
            else if (db_data[i].cache_type == 'no-store') data_plain[3] = percent;
          }
        }
        //2)CALL CHART
        chart_3_c(data_png, data_gif, data_html, data_plain);
      }
    });
  });
});
