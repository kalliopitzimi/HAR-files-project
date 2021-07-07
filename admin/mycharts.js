/*** Chart 2 a ***/
function chart_2_a(app_js, text_css, image_png, text_js)
{
  var ctx = document.getElementById('chart_2_a').getContext('2d');
  var chart_2_a= new Chart(ctx, 
  {
    type: 'bar',
    data: {
      labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [ {
        label: "application/javascipt",
        data: app_js,
        backgroundColor: getRandomColorHex(),
      },
       {
        label: "text/css",
        data: text_css,
        backgroundColor: getRandomColorHex(),
      },
        {
          label: "image/png",
          data: image_png,
          backgroundColor: getRandomColorHex(),
      },
       {
        label: "text/javascript",
        data: text_js,
        backgroundColor: getRandomColorHex(),
      }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive: false,
    }
  }); 
}

/*** Chart 2 b  ***/
function chart_2_b(mon,tue,wen,thu,fri,sat,sun)
{
  var ctx = document.getElementById('chart_2_b').getContext('2d');
  var chart_2_b= new Chart(ctx, 
  {
    type: 'bar',
    data: {
      labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [{
        label: "Monday",
        data: mon ,
        backgroundColor: getRandomColorHex()
      },
       {
        label: "Tuesday",
        data: tue,
        backgroundColor: getRandomColorHex()
      },
        {
          label: "Wednesday",
          data: wen,
          backgroundColor: getRandomColorHex()
      },
       {
        label: "Thursday",
        data: thu,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "Friday",
        data: fri,
        backgroundColor: getRandomColorHex()
      },
        {
          label: "Saturday",
          data: sat,
          backgroundColor: getRandomColorHex()
      },
       {
        label: "Sunday",
        data: sun,
        backgroundColor: getRandomColorHex()
      }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive: false,
    }
  }); 
}

/*** Chart 2 c ***/
function chart_2_c(get,post,head,del,options,put)
{
  var ctx = document.getElementById('chart_2_c').getContext('2d');
  var chart_2_c= new Chart(ctx, 
  {
    type: 'bar',
    data: {
      labels: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
      datasets: [{
        label: "GET",
        data: get ,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "POST",
        data: post ,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "HEAD",
        data: head ,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "DELETE",
        data: del,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "OPTIONS",
        data: options ,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "PUT",
        data: put ,
        backgroundColor: getRandomColorHex()
      }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
    }
  }); 
}

/*** Chart 3 a ***/
function chart_3_a(db_data, chart_data, dataset)
{
  var ctx = document.getElementById('chart_3_a').getContext('2d');
  window.chart_3_a = new Chart(ctx, 
  {
    type: 'bar',
    data: {
        labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          },
        responsive: false,
      }
  });

  //Dynamically update chart's dataset 
  for (var i=0; i<db_data.length; i++)
  {
    chart_3_a.data.datasets.push
    ({
        label: db_data[i].res_content_type, 
        data: dataset[i],
        backgroundColor: getRandomColorHex()
      });
  }   
  window.chart_3_a.update(); //update chart
}

/*** Chart 3 b  ***/
function chart_3_b(data_text, data_application)
{
  var ctx = document.getElementById('chart_3_b').getContext('2d');
  var chart_3_b= new Chart(ctx, 
  {
    type: 'bar',
    data: {
        labels: ['max-stale', 'min-fresh'],
        datasets: [{
          label: "text/plain",
          data:  data_text,
          backgroundColor: getRandomColorHex()
        },
        {
          label: "application/json",
          data: data_application,
          backgroundColor: getRandomColorHex()
        }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive: false,
    }
  }); 
}

/*** Chart 3 c  ***/
function chart_3_c(data_png, data_gif, data_html, data_plain)
{
  var ctx = document.getElementById('chart_3_c').getContext('2d');
  var chart_3_c= new Chart(ctx, 
  {
    type: 'bar',
    data: {
      labels: [ 'public', 'private', 'no-cache', 'no-store' ],
      datasets: [{
        label: "image/gif",
        data:  data_gif,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "image/png",
        data: data_png,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "text/html",
        data:  data_html,
        backgroundColor: getRandomColorHex()
      },
      {
        label: "text/plain",
        data:  data_plain,
        backgroundColor: getRandomColorHex()
      }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      responsive: false,
    }
  }); 
}



// UTILITY FUNCTIONS :
// 1) Function to calculate the number of occurence => dataset 
function getOccurrence(array, value) {
  return array.filter((v) => (v === value)).length;
}

// 2) Function to generate a random color for every dataset
function getRandomColorHex() {
  var hex = "0123456789ABCDEF",
      color = "#";
  for (var i = 1; i <= 6; i++) {
  color += hex[Math.floor(Math.random() * 16)];
  }
  return color;
}