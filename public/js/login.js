// Login Page Javascript
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
      document.location.replace('/profile');
    } else {
      alert('Failed to log in');
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);



// Sign Up Page Javascript

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


// Toggling between cards Javascript

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