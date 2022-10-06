
let togglePassword = (icon, id) => {
    let pwdfield = document.getElementById(id);
    pwdfield.setAttribute('type', (pwdfield.getAttribute('type') === 'password' )? 'text' : 'password');
    icon.classList.toggle('fa-eye-slash');
}
