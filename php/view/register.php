<section id="register" class="auth_section hidden">
    <div class="container">
        <h3>REGISTRAZIONE</h3>
        <span id="redirect_to_login">Sono già registrato.</span>
        <form id="register_form">
            <input type="text" name="username" id="reg_username" placeholder="Username" required>
            <span id="span_username_available"></span>
            <span id="span_username" for="reg_username"></span>
            <span class="pwd_container" style="display: flex; justify-content: space-between; align-items: center; margin: auto">
                <input type="password" name="password" id="reg_password" placeholder="Password" style="width: 95%;" required>
                <span><img src="./images/icons/eye-solid.svg" alt="" onclick="togglePassword(this, 'reg_password')" style="cursor: pointer; width: 30px; margin-left: 1vw;"></span>
            </span>
            <span id="span_password" for="reg_password"></span>
            <span class="pwd_container" style="display: flex; justify-content: space-between; align-items: center; margin: auto">
                <input type="password" name="password_confirm" id="reg_password_confirm" placeholder="Conferma password" style="width: 95%;" required>
                <span><img src="./images/icons/eye-solid.svg" alt="" onclick="togglePassword(this, 'reg_password_confirm')" style="cursor: pointer; width: 30px; margin-left: 1vw;"></span>
            </span>
            <span id="span_confirm_password" for="reg_password_confirm"></span>
            <div class="radio_group">
                <div class="pisa">
                    <input type="radio" value="1" name="team" id="pisani" required checked>
                    <span for="pisani">Pisani</span>
                </div>
                <div class="genova">
                    <input type="radio" value="2" name="team" id="genovesi">
                    <span for="genovesi">Genovesi</span>
                </div>
            </div>
            <button type="submit" id="reg_submit" disabled>INVIA</button>
            <span class="form_message" id="form_message_register"></span>
        </form>
    </div>
    <div class="overlay_home hidden">
        <div class="registered_modal">
            <h3 class="registered_message">Registrazione effettuata!</h3>
            <div class="registered_btngroup">
                <button class="registered_tologin" onclick="authRedirect('register', 'login');">Vai al Login</button>
            </div>
        </div>
    </div>
</section>