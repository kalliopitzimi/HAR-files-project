//LOG IN
$(document).ready(function()
 {
     $("#log-btn").click(function()
     {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username == "" || password == "")
        {
            $("#log-message").html("Please fill in the blanks");
        }
        else
        {
            $.ajax({
                type: "POST",
                url: "login.php",
                data: 
                { 
                    username: username,
                    password: password
                },
            
                success: function (response) 
                {
                    if (response == 1 )
                    {
                        window.location = "user/user.php";
                    }
                    else if ( response == -1)
                    {
                        window.location = "admin/admin.php";
                    }
                    else if (response == 0)
                    {	
                        $("#log-message").html("Invalid username or password!");
                    }
                    else console.log(response); //for debugging reasons
                }
            });
        }
    });
});

//SIGN UP
 $(document).ready(function()
 {
    $("#reg-btn").click(function()
    {
        var username = document.getElementById('username1').value; 
        var email = document.getElementById('email').value;
        var password = document.getElementById('password1').value;
        var cpassword = document.getElementById('cpassword').value;

        if( username == "" || email == "" || password == "" || cpassword == "")
        {
            $("#reg-message").html("Please fill in the blanks");
        }
        else
        {

            $.ajax({
                type: "POST",
                url: "signup.php",
                data: 
                    { 
                        username: username,
                        email: email,
                        password: password,
                        cpassword: cpassword
                    },
                
                    success: function (response) 
                    {
                        
                        if (response == 1 )
                        {
                            window.location = "user/user.php";
                        }
                        else if (response == 0 )
                        {
                            $("#reg-message").html("Error. Please try again.");
                        }
                        else if (response == -1 )
                        {
                            $("#reg-message").html("Password should be at least 8 characters, contain an uppercase, a number and a special character.");
                        }
                        else if (response == -2 )
                        {
                            $("#reg-message").html("Username already taken.");
                        }
                        else console.log(response); //for debugging reasons
                    }
                
            });
        }
    }); 
});