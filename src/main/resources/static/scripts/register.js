var errormsg;

function oninit()
{
    errormsg = document.getElementById('errormsg');
}

//jQuery form for registering new user
$('#register').ajaxForm({
    url: "/register",
    beforeSubmit: validate, // before sumbit validate
    success: function() {
        errormsg.style.display = 'none';
        window.location.replace("/");
    },
    error: function() { // if email exists server returns error so display message
        errormsg.style.display = 'block';
        errormsg.innerHTML = "Email already in use";
    }
});

// validate passwords shoud be the same and longer than 4 characters
// if ok return true else false
function validate()
{
    let form = document.regForm;

    if(form.password.value.length < 4)
    {
        errormsg.innerHTML = "Password must more than 4 characters long!";
        errormsg.style.display = "block";
        return false;
    }
    if(form.password.value !== form.passwordRep.value)
    {
        errormsg.innerHTML = "Passwords are not machting!";
        errormsg.style.display = "block";
        return false;
    }
    return true;
}