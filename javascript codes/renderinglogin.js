 const loginhtml ="";
 function showlogin(){
    loginhtml =
        `<div class="login-container">
        <h2 id="form-title">Login</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="login">Username</label>
                <input type="username" id="login-username" name="login-username" required>
            </div>
            <div class="form-group">
                <label for="login-password">Password</label>
                <input type="password" id="login-password" name="login-password" required>
            </div>
            <button type="submit" class="login-btn">Login</button>
        </form>
        <form id="signup-form" style="display:none;">
            <div class="form-group">
                <label for="signup-email">Email</label>
                <input type="email" id="signup-email" name="signup-email" required>
            </div>
            <div class="form-group">
                <label for="signup-username">Username</label>
                <input type="username" id="signup-username" name="signup-username" required>
            </div>
            <div class="form-group">
                <label for="signup-phone-number">Phone Number</label>
                <input type="phone-number" id="signup-phone-number" name="signup-phone-number"+254 required>
            </div>
            <div class="form-group">
                <label for="signup-password">Password</label>
                <input type="password" id="signup-password" name="signup-password" required>
            </div>
            <button type="submit" class="signup-btn">Sign Up</button>
        </form>
        <span class="toggle-link" id="toggle-link">Don't have an account? Sign Up</span>
    </div>`
}