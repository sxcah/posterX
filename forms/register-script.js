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
const contactNumInput = document.getElementById('contact-number');
const contactNumError = document.getElementById('contact-number-error');
const firstNameInput = document.getElementById('first-name');
const lastNameInput = document.getElementById('last-name');
const firstNameError = document.getElementById('first-name-error');
const lastNameError = document.getElementById('last-name-error');

const generalError = document.getElementById('general-error');

let isUsernameValid = false;
let isEmailValid = false;
let isContactNum = false;
let isFirstNameValid = false;
let isLastNameValid = false;

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

function validateContactNum() {
    const contactNum = contactNumInput.value.trim();
    const contactNumRegex = /^[0-9]+$/;
    const minVal = 10;
    const maxVal = 12;

    if (contactNum === "") {
        contactNumError.textContent = "";
        isContactNum = false;
    } else if (contactNum.length <= minVal) {
        contactNumError.textContent = "Contact Number is invalid must have 11 characters.";
        isContactNum = false;
    } else if (contactNum.length >= maxVal) {
        contactNumError.textContent = "Contact Number is invalid must have 11 characters.";
        isContactNum = false;
    } else if (!contactNumRegex.test(contactNum)){
        contactNumError.textContent = "Invalid. Can only accept integers."
        isContactNum = false;
    } else {
        contactNumError.textContent = "";
        isContactNum = true;
    }
    togglePasswordGroupVisibility();
    enableDisableSubmit();
}

function validateFirstName() {
    const firstName = firstNameInput.value.trim();
    const firstNameRegex = /^[a-zA-Z]+$/;

    if (firstName === "") {
        firstNameError.textContent = "";
        isFirstNameValid = false;
    } else if (!firstNameRegex.test(firstName)) {
        firstNameError.textContent = "First Name can only contain letters.";
        isFirstNameValid = false;
    } else {
        firstNameError.textContent = "";
        isFirstNameValid = true;
    }
    togglePasswordGroupVisibility();
    enableDisableSubmit();
}

function validateLastName() {
    const lastName = lastNameInput.value.trim();
    const lastNameRegex = /^[a-zA-Z]+$/;

    if (lastName === "") {
        lastNameError.textContent = "";
        isLastNameValid = false;
    } else if (!lastNameRegex.test(lastName)) {
        lastNameError.textContent = "Last Name can only contain letters.";
        isLastNameValid = false;
    } else {
        lastNameError.textContent = "";
        isLastNameValid = true;
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
    if (isUsernameValid && isEmailValid && isContactNum && isFirstNameValid && isLastNameValid) {
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
    return isUsernameValid && isEmailValid && isConfirmPasswordValid && isContactNum && isFirstNameValid && isLastNameValid;
}

function enableDisableSubmit() {
    const isConfirmPasswordValid = (passwordGroup.style.display === 'none') || validateConfirmPassword();
    submitButton.disabled = !(isUsernameValid && isEmailValid && isConfirmPasswordValid && isContactNum && isFirstNameValid && isLastNameValid);
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
contactNumInput.addEventListener('input', validateContactNum);
firstNameInput.addEventListener('input', validateFirstName);
lastNameInput.addEventListener('input', validateLastName);