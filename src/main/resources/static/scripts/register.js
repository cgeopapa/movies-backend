function validate()
{
    let form = document.regForm;
    let errormsg = document.getElementById("errormsg");

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
var modal = document.getElementById('register');

$('#register').ajaxForm({
    url: "/register",
    success: function() {
        document.getElementById('register-error').style.display = 'none';
    },
    error: function() {
        document.getElementById('register-error').style.display = 'block';
    }
});