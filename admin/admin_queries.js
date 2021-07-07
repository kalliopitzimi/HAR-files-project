//LAST UPLOAD
$(document).ready(function() 
{
    $("#button1").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "total_users"},
            success:function(response)
            {
                $("#display1").html(response);
            }
        }); 
    });
});    


$(document).ready(function() 
{
    $("#button2").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "entries_per_request"},
            success:function(response)
            {
                $("#display2").html(response);
            }
        }); 
    });
});  

$(document).ready(function() 
{
    $("#button3").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "entries_per_response"},
            success:function(response)
            {
                $("#display3").html(response);
            }
        }); 
    });
}); 

$(document).ready(function() 
{
    $("#button4").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "unique_domains"},
            success:function(response)
            {
                $("#display4").html(response);
            }
        }); 
    });
}); 


$(document).ready(function() 
{
    $("#button5").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "unique_isps"},
            success:function(response)
            {
                $("#display5").html(response);
            }
        }); 
    });
}); 


$(document).ready(function() 
{
    $("#button6").click(function() 
    {
        $.ajax({
            type: "GET",
            url: "admin_queries.php",
            data: { data: "average_age"},
            success:function(response)
            {
                $("#display6").html(response);
            }
        }); 
    });
}); 

