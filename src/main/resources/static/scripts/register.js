var errormsg;

function oninit()
{
    errormsg = document.getElementById('errormsg');
}

$('#register').ajaxForm({
    url: "/register",
    beforeSubmit: validate,    
    success: function() {
        errormsg.style.display = 'none';
        window.location.replace("/");
    },
    error: function() {
        errormsg.style.display = 'block';
        errormsg.innerHTML = "Email already in use";
    }
});

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