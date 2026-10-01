// Toggle between login and signup forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const toggleLink = document.getElementById('toggle-link');
const formTitle = document.getElementById('form-title');
toggleLink.onclick = function(e) {
e.preventDefault(); 
if (loginForm.style.display === 'none') {
loginForm.style.display = 'block';
signupForm.style.display = 'none';
formTitle.textContent = 'Login';
toggleLink.textContent = "Don't have an account? Sign Up";
} else {
loginForm.style.display = 'none';
signupForm.style.display = 'block'; 
formTitle.textContent = 'Sign Up';
toggleLink.textContent = 'Already have an account? Login';
}   
};

// Handle form submissions
loginForm.onsubmit = async function(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const userPassword = document.getElementById('login-password').value;

  try {
    const response = await fetch('https://exchangeable-unwisely-arden.ngrok-free.dev/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        userPassword
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('loggedInUser', username);
      localStorage.setItem('token', data.token); // If your server returns a token
      alert('Login successful!');
      window.location.href = 'Photon merchant website.html';
    } else {
      alert(data.message || 'Invalid credentials!');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
};

signupForm.onsubmit = async function(e) {
  e.preventDefault();
  const Email = document.getElementById('signup-email').value;
  const userPassword = document.getElementById('signup-password').value;
  const username = document.getElementById('signup-username').value;
  const phoneNumber = document.getElementById('signup-phone-number').value;

  localStorage.setItem('Email',Email)
  
  try {
    const response = await fetch('https://exchangeable-unwisely-arden.ngrok-free.dev/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Email,
        userPassword,
        username,
        phoneNumber
      })
    });

    const data = await response.json();

    if (response.ok) {


// Redirect to verification page
window.location.href = "verification.html";


    // Redirect to verification page
    window.location.href = "verification.html";
  } else {
    alert(data.message || 'Error creating account');
  }

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during signup');
  }
};