const form = document.querySelector('form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const submitButton = document.getElementById('submit');
const generalError = document.getElementById('general-error');

async function loginUser(formData) {
    try {
        const response = await fetch('../api/login-user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Store user session information (e.g., token) if needed
                window.location.href = '../home.php'; // Redirect to dashboard or main page
            } else {
                displayError(data.error || 'Invalid username or password.');
            }
        } else {
            const errorData = await response.json();
            displayError(errorData.error || 'Login failed due to a server error.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        displayError('An unexpected error occurred. Please try again later.');
    }
}

function displayError(message) {
    generalError.textContent = message;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    loginUser(formData);
});

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

// Attach toggle visibility to the icon (assuming it's a sibling with an onclick)
const passwordIcon = document.querySelector('#password + .input-icon');
if (passwordIcon) {
    passwordIcon.onclick = () => togglePasswordVisibility('password');
}