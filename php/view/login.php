<section id="login" class="auth_section">
    <div class="container">
        <h3>LOGIN</h3>
        <form id="login_form">
            <input type="text" name="username" placeholder="Username" required>
            <span class="pwd_container" style="display: flex; justify-content: space-between; align-items: center; margin: auto">
                <input type="password" name="password" placeholder="Password" id="pwd_login" style="width: 95%;" required> 
                <span><img src="./images/icons/eye-solid.svg" alt="" onclick="togglePassword(this, 'pwd_login')" style="cursor: pointer; width: 30px; margin-left: 1vw;"></span>
            </span>
            <button type="submit">INVIA</button>
            <span class="form_message" id="form_message_login"></span>
        </form>
        <span id="redirect_to_register">Non sono ancora registrato.</span>
    </div>
</section>