/*
UPLOAD DATA, functions involved:

1) loadHAR: loads a .HAR file and removes sensitive data
2) downloadJSON: downloads the updated .JSON file, which contains only useful data
3) uploadtoserver: uploads data to server

STATISTICS, functions involved:

1) Last upload: when was the last time the user uploaded a file
2) Total uploads: how many .HAR files the user has uploaded

UTILITY functions:

1) getUsersData: returns ip, city and isp of the user that uploads a HAR file
2) getServersData: returns geo coordinates of every server's IP

*/


//Prototyping global variables

var clean_json = new Array (); // where only useful har data are stored  
var access_key  = '7592622658cfc66b778fa38cb722166d'; //my personal ipstack access key 
var day; // changes the date format 
var servers_data; // keeps the returned geo coordinates 

//1) loadHAR
$(document).ready(function()
{
    $("#upload-btn").click(function()
    {
        //Open the file 
        var fileInput = document.querySelector("#myfiles");
        var files = fileInput.files;
        var file = files[0];
        var filepath = fileInput.value;
        
        //File type validation check
        var allowed_type = /(\.har)$/i; //regex 
        if (!allowed_type.exec(filepath))
        {
            alert("Only HAR files are allowed. Please try again.");
        }
        else $("#message").html("The file has been successfully uploaded!");


        //Opening file reader to proccess file
        const reader = new FileReader();
        reader.onload=function()
        {
            var har_entries = JSON.parse(reader.result);
        
            var entries = har_entries.log.entries;

            //Initialize headers to save 
            var req_content = req_cache = req_pragma = req_expires = req_age = req_last = req_host =
                res_content = res_cache = res_pragma = res_expires = res_age = res_last = res_host = 0 ;

            //ENTRIES LOOP 
            for (var i = 0; i< entries.length; i++)
            { 
                if(entries[i].serverIPAddress!= "") // in case server's IP is empty
                { 
                    // REQUEST HEADERS
                    var req_headers = entries[i].request.headers;
                    for (var j = 0; j< req_headers.length; j++)
                    {
                        if (req_headers[j].name == "content-type")
                        {
                            req_content = req_headers[j].value;
                        }
                        if (req_headers[j].name == "cache-control")
                        {
                            req_cache = req_headers[j].value;
                        }
                        if (req_headers[j].name == "pragma")
                        {
                            req_pragma = req_headers[j].value; 
                        }
                        if (req_headers[j].name == "expires")
                        {
                            day = new Date(req_headers[j].value);
                            req_last = day.toISOString();
                        }
                        if (req_headers[j].name == "age")
                        {
                            req_age = req_headers[j].value;
                        }
                        if (req_headers[j].name == "last-modified")
                        {
                            day = new Date(req_headers[j].value);
                            req_last = day.toISOString();
                        }
                        if (req_headers[j].name == "Host")
                        {
                            req_host = req_headers[j].value;
                        }
                    
                    }

                    //RESPONSE HEADERS
                    var res_headers = entries[i].response.headers;
                    for (var j = 0; j< res_headers.length; j++)
                    {
                        if (res_headers[j].name == "content-type")
                        {
                            res_content = res_headers[j].value;
                        }
                        if (res_headers[j].name == "cache-control")
                        {
                        res_cache = res_headers[j].value;
                        }
                        if (res_headers[j].name == "pragma")
                        {
                            res_pragma = res_headers[j].value; 
                        }
                        if (res_headers[j].name == "expires")
                        {
                            day = new Date(res_headers[j].value);
                            res_expires = day.toISOString();
                        }
                        if (res_headers[j].name == "age")
                        {
                            res_age = res_headers[j].value;
                        }
                        if (res_headers[j].name == "last-modified")
                        {
                            day = new Date(res_headers[j].value);
                            res_last = day.toISOString();
                        }
                        if (res_headers[j].name == "Host")
                        {
                            res_host = res_headers[j].value;
                        }
                    }

                    //Removing [ ] from serverIPAddress, if necessary
                    if ( entries[i].serverIPAddress.indexOf('[')> -1)
                    {
                        entries[i].serverIPAddress = entries[i].serverIPAddress.substring(1, entries[i].serverIPAddress.length -1);
                    }

                    //Keeping only the domain of url
                    var full_url = entries[i].request.url ;
                    var sub_url = full_url.slice(8); //Removing the "https://"
                    var index = sub_url.indexOf("/"); //index = position of "/"
                    //Final url: 
                    full_url = full_url.substring(0, index + 8); 
                
                    //Retrieve geo coordinates 
                    servers_data = JSON.parse( getServersData(entries[i].serverIPAddress ));

                    //Push clean data
                    clean_json.push(  
                        {
                            serverIPAddress: entries[i].serverIPAddress,
                            serversLatitude: servers_data.latitude,
                            serversLongitude: servers_data.longitude,
                            startedDateTime: entries[i].startedDateTime, 
                            timings: { wait: entries[i].timings.wait },
                            request: {
                                method: entries[i].request.method,
                                url: full_url,
                                headers: {
                                    content_type: req_content,
                                    cache_control: req_cache,
                                    pragma: req_pragma,
                                    expires: req_expires,
                                    age: req_age,
                                    last_modified: req_last,
                                    host: req_host       
                                }
                            },
                            response: {
                                status: entries[i].response.status,
                                statusText: entries[i].response.statusText,
                                headers: {
                                    content_type: res_content,
                                    cache_control: res_cache,
                                    pragma: res_pragma,
                                    expires: res_expires,
                                    age: res_age,
                                    last_modified: res_last,
                                    host: res_host 
                                }
                            }
                        }
                    );

                    req_content = req_cache = req_pragma = req_expires = req_age = req_last = req_host = 0;
                    res_content = res_cache = res_pragma = res_expires = res_age = res_last = res_host = 0;
                }
            }//entries
           console.log(clean_json); //for debugging reasons;
        }//onload
        reader.readAsText(file);   
    });
});    



//2) downloadJSON
$(document).ready(function()
{
    $("#download").click(function()
    {
        var output = JSON.stringify(clean_json);

        if (output == "[]")
        {
            alert("Please upload a file first.");
        }
        else
        {
            output = [output];
            var blob1 = new Blob(output, { type: "application/json" });

            var isIE = false || !!document.documentMode;

            if (isIE) {
                window.navigator.msSaveBlob(blob1, "output.json");
            } else {
                var url = window.URL || window.webkitURL;
                link = url.createObjectURL(blob1);
                var a = document.createElement("a");
                a.download = "output.json";
                a.href = link;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    });
});

//3) upload to server
$(document).ready(function()
{
    $("#upload").click(function()
    {
    
        var har_data = JSON.stringify(clean_json); 
        var users_data = getUsersData(); 
       
        if (har_data == "[]")
        {
            alert("Please upload a file first.");
        }
        else
        {
            //HAR ENTRIES UPLOAD
            $.ajax({
                type: "POST",
                url: "user_queries.php",
                data: { har_data: har_data,
                        users_data: users_data },
                    success: function(response){
                        $("#server").html("Your file has been uploaded to server");
                }
            });
        }
    });
});

  
//1)Last upload 
$(document).ready(function() 
{
    $("#btn1").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "user_queries.php",
            data: { data: "last_updated"},
            success:function(response)
            {
                $("#display1").html(response);
            }
        }); 
    });
});  

//2)Total uploads
$(document).ready(function() 
{
    $("#btn2").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "user_queries.php",
            data: { data: "total_uploads"},
            success:function(response)
            {
                $("#display2").html(response);
            }
        }); 
    });
});  

//Utility functions
function getUsersData()
{

    var ip = $.ajax({ 
        url: 'https://ipapi.co/ip', 
        async: false,
    }).responseText;

    var city = $.ajax({ 
        url: 'https://ipapi.co/city', 
        async: false,
    }).responseText;

    var isp = $.ajax({ 
        url: 'https://ipapi.co/org', 
        async: false,
    }).responseText;
    
    return {ip, city, isp} ;
}


function getServersData(ip) 
{
    return $.ajax({ 
        url: 'http://api.ipstack.com/' + ip + '?access_key=' + access_key ,
        async: false,
    }).responseText;   
}