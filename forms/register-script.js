const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordGroup = document.getElementById('form-password-group');
const submitButton = document.getElementById('submit');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordInput = document.getElementById('password');
const passwordError = document.getElementById('password-error');
const confirmPasswordInput = document.getElementById('confirm-password');
const confirmPasswordError = document.getElementById('confirm-password-error');
const generalError = document.getElementById('general-error');

let isUsernameValid = false;
let isEmailValid = false;

function validateUsername() {
    const username = usernameInput.value.trim();
    const usernameRegex = /^[a-zA-Z0-9_]+$/;

    if (username === "") {
        usernameError.textContent = "";
        isUsernameValid = false;
    } else if (!usernameRegex.test(username)) {
        usernameError.textContent = "Username can only contain letters, numbers, and underscores.";
        isUsernameValid = false;
    } else {
        usernameError.textContent = "";
        isUsernameValid = true;
    }
    togglePasswordGroupVisibility();
    enableDisableSubmit();
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.textContent = "";
        isEmailValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isEmailValid = false;
    } else {
        emailError.textContent = "";
        isEmailValid = true;
    }
    togglePasswordGroupVisibility();
    enableDisableSubmit();
}

function togglePasswordGroupVisibility() {
    if (isUsernameValid && isEmailValid) {
        passwordGroup.style.display = 'flex';
    } else {
        passwordGroup.style.display = 'none';
        passwordInput.value = "";
        passwordError.textContent = "";
        confirmPasswordInput.value = "";
        confirmPasswordError.textContent = "";
    }
}

function validatePassword() {
    const password = passwordInput.value;

    if (password === "") {
        passwordError.textContent = "";
        return true;
    } else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters long.";
        return false;
    } else {
        passwordError.textContent = "";
        return true;
    }
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword === "") {
        confirmPasswordError.textContent = "";
        return true;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        return false;
    } else {
        confirmPasswordError.textContent = "";
        return true;
    }
}

function validateForm() {
    validateUsername();
    validateEmail();
    const isConfirmPasswordValid = (passwordGroup.style.display === 'none') || validateConfirmPassword();
    return isUsernameValid && isEmailValid && isConfirmPasswordValid;
}

function enableDisableSubmit() {
    const isConfirmPasswordValid = (passwordGroup.style.display === 'none') || validateConfirmPassword();
    submitButton.disabled = !(isUsernameValid && isEmailValid && isConfirmPasswordValid);
}

function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling.querySelector('img');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.src = '../assets/icons/ic-closed-eye.png';
        icon.alt = 'hide';
    } else {
        passwordInput.type = 'password';
        icon.src = '../assets/icons/ic-open-eye.png';
        icon.alt = 'show';
    }
}

async function registerUser(formData) {
    try {
        const response = await fetch('../api/register-user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            displayServerSideErrors(errorData);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        generalError.textContent = 'An unexpected error occurred. Please try again later.';
    }
}

function displayServerSideErrors(errors) {
    usernameError.textContent = errors.username || '';
    emailError.textContent = errors.email || '';
    confirmPasswordError.textContent = errors.confirm_password || '';
    generalError.textContent = errors.general || '';
    enableDisableSubmit(); // Re-evaluate submit button state
}

form.addEventListener('submit', function(event) {
        event.preventDefault();
    if (validateForm()) {
        const formData = new FormData(form);
        registerUser(formData);
    }
});

// Initial check to disable submit
enableDisableSubmit();

usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);
confirmPasswordInput.addEventListener('input', validateConfirmPassword);