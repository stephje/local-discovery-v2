const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Getting Cards 
var loginCard = document.getElementById('loginCard');
var signupCard = document.getElementById('signupCard');

// Get the buttons
var signupPageRequest = document.querySelector('#signup');
var loginPageRequest = document.querySelector('#login');

// Note cards have hidden attribute.
// This is to switch login on
loginCard.classList.toggle("hidden");

// Getting when click, hide all except requested card
document.querySelector('#signup')
  .addEventListener("click", () => {
    loginCard.classList.toggle("hidden");
    signupCard.classList.toggle("hidden");
  });

document.querySelector('#login')
  .addEventListener("click", () => {
    signupCard.classList.toggle("hidden");
    loginCard.classList.toggle("hidden");
  });