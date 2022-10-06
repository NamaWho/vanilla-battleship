let isUsernameValid = false;
let isPasswordValid = false;

document.addEventListener("DOMContentLoaded", function(event) { 
     
    // Register form fields validation
    document.getElementById("reg_username").addEventListener("keyup", validateUsername);
    document.getElementById("reg_password").addEventListener("keyup", validatePassword);
    document.getElementById("reg_password_confirm").addEventListener("keyup", validatePasswordMatch);
    
    // auth request handling
    document.getElementById("login_form").addEventListener("submit", (e) => sendRequest(e, "login"))
    document.getElementById("register_form").addEventListener("submit", (e) => sendRequest(e, "register"))

    document.getElementById("redirect_to_register").addEventListener("click", () => authRedirect("login", "register"));
    document.getElementById("redirect_to_login").addEventListener("click", () => authRedirect("register", "login"));
});

let sendRequest = (e, action = "") => {
    e.preventDefault();

    if (action == "register") {
        validatePasswordMatch();
        validateUsername();
    
        if (!isUsernameValid || !isPasswordValid)
            return;
    }

    let formData = new FormData(e.target);
    formData.append("action", action);

    fetch('./php/api_auth.php', {method: 'POST', body: formData})
	.then(res => res.json())
	.then(data => {
        if (!data.error) success(action);
        else error(action, data.message);
    }
	);
}

// checks if the password and password-confirm fields match
let validatePasswordMatch = () => {

    if (document.getElementById("reg_password").value !== document.getElementById("reg_password_confirm").value){
        document.getElementById("span_confirm_password").innerText = "Le password non corrispondono";
        document.getElementById("reg_password_confirm").classList.add("input_error");
        isPasswordValid = false;
    } else {
        document.getElementById("span_confirm_password").innerText = "";
        document.getElementById("reg_password_confirm").classList.remove("input_error");
        isPasswordValid = true;
    }
    toggleSubmit();
}

// check password validity
let validatePassword = () => {
    
    // empty password_confirm field and span if not empty
    // it's like resetting fields
    if (document.getElementById("reg_password_confirm").value != ""){
        document.getElementById("reg_password_confirm").value = "";
        document.getElementById("span_confirm_password").innerText = "";
        document.getElementById("reg_password_confirm").classList.remove("input_error");
        isPasswordValid = false;
        toggleSubmit();
    }
    
    if (!(/^(?=.*\d)(?=.*[A-Za-z])[0-9A-Za-z!@#$%]{8,12}$/.test(document.getElementById("reg_password").value))){
        document.getElementById("span_password").innerText = "Inserire 8-12 caratteri (A-Z, a-z, 0-9, !@#$%). Almeno una lettera, almeno un numero.";
        document.getElementById("reg_password").classList.add("input_error");
    }
    else {
        document.getElementById("span_password").innerText = "";
        document.getElementById("reg_password").classList.remove("input_error");
    }
}

let validateUsername = () => {
    
    // validate username sintax 
    if (!((/^[a-z\d_]{4,20}$/i).test(document.getElementById("reg_username").value))){
        
        document.getElementById("span_username").innerText = "Inserire 4-20 caratteri (A-Z, a-z, 0-9, _)";
        document.getElementById("reg_username").classList.add("input_error");
        document.getElementById("span_username_available").innerText = "";
        isUsernameValid = false;
    } 
    // if username is properly formed, then check availability in the database
    else {
        document.getElementById("span_username").innerText = "";
        document.getElementById("reg_username").classList.remove("input_error");
        assertUsernameAvailability();
    }
}

// Send an ajax to assert that username does not already exist
let assertUsernameAvailability = () => {
    let payload = new FormData();
    payload.append('username', document.getElementById("reg_username").value);
    payload.append('action', "validateusername");

    fetch('./php/api_auth.php', {method: 'POST', body: payload})
	.then(res => res.json())
	.then(data => {
       let error = data.error;
       let message = data.message;

       if (!error) {

            document.getElementById("span_username").innerText = "";
            document.getElementById("span_username_available").innerText = "✔ Username disponibile";
            document.getElementById("reg_username").classList.remove("input_error");
            isUsernameValid = true;
        }
        else {
            document.getElementById("span_username").innerText = "❌ Username non disponibile'";
            document.getElementById("span_username_available").innerText = "";
            document.getElementById("reg_username").classList.add("input_error");
            isUsernameValid = false;
        }
        
        toggleSubmit();
    }
	);
}

let toggleSubmit = () => {
    if (isUsernameValid && isPasswordValid)
        document.getElementById("reg_submit").disabled = false;
    else 
        document.getElementById("reg_submit").disabled = true;
}

let success = (action) => {
    switch (action) {
        case "login":
            location.reload();
            break;
        case "register":
            document.getElementsByClassName("overlay_home")[0].classList.remove("hidden");
            break;
        default:
            break;
    }
}

let error = (action, message) => {
    document.getElementById("form_message_" + action).innerText = message;
}

let authRedirect = (from, to) => {
    document.getElementById(from).classList.add("hidden");
    document.getElementById(to).classList.remove("hidden");

    document.getElementsByClassName("overlay_home")[0].classList.add("hidden");
}