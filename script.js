// ...existing code...
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const summary = document.getElementById('summary');

// Fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const genderRadios = document.querySelectorAll('input[name="gender"]');
const country = document.getElementById('country');
const terms = document.getElementById('terms');

// Error elements
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const genderError = document.getElementById('genderError');
const countryError = document.getElementById('countryError');
const termsError = document.getElementById('termsError');

// Validation functions
function validateFirstName() {
    const value = firstName.value.trim();
    if (value.length < 5) {
        showError(firstNameError, 'First Name must be at least 5 characters.');
        return false;
    } else {
        hideError(firstNameError);
        return true;
    }
}

function validateLastName() {
    // Assuming no specific validation for Last Name, but we can add if needed
    hideError(lastNameError);
    return true;
}

function validateEmail() {
    const value = email.value.trim();
    if (!value.includes('@')) {
        showError(emailError, 'Email must contain "@".');
        return false;
    } else {
        hideError(emailError);
        return true;
    }
}

function validatePassword() {
    const value = password.value;
    if (value.length < 8 || !/[A-Z]/.test(value)) {
        showError(passwordError, 'Password must be at least 8 characters and contain one uppercase letter.');
        return false;
    } else {
        hideError(passwordError);
        return true;
    }
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    if (value !== password.value) {
        showError(confirmPasswordError, 'Confirm Password must match Password.');
        return false;
    } else {
        hideError(confirmPasswordError);
        return true;
    }
}

function validateGender() {
    const checked = Array.from(genderRadios).some(radio => radio.checked);
    if (!checked) {
        showError(genderError, 'Gender must be selected.');
        return false;
    } else {
        hideError(genderError);
        return true;
    }
}

function validateCountry() {
    const value = country.value;
    if (value === '') {
        showError(countryError, 'Country must be selected.');
        return false;
    } else {
        hideError(countryError);
        return true;
    }
}

function validateTerms() {
    if (!terms.checked) {
        showError(termsError, 'Terms and conditions must be checked.');
        return false;
    } else {
        hideError(termsError);
        return true;
    }
}

function showError(element, message) {
    element.textContent = message;
    element.classList.add('error');
}

function hideError(element) {
    element.textContent = '';
    element.classList.remove('error');
}

function checkAllValid() {
    const isValid = validateFirstName() && validateLastName() && validateEmail() && validatePassword() && validateConfirmPassword() && validateGender() && validateCountry() && validateTerms();
    submitBtn.disabled = !isValid;
}

// Event listeners for live validation
firstName.addEventListener('input', () => { validateFirstName(); checkAllValid(); });
lastName.addEventListener('input', () => { validateLastName(); checkAllValid(); });
email.addEventListener('input', () => { validateEmail(); checkAllValid(); });
password.addEventListener('input', () => { validatePassword(); validateConfirmPassword(); checkAllValid(); });
confirmPassword.addEventListener('input', () => { validateConfirmPassword(); checkAllValid(); });
genderRadios.forEach(radio => radio.addEventListener('change', () => { validateGender(); checkAllValid(); }));
country.addEventListener('change', () => { validateCountry(); checkAllValid(); });
terms.addEventListener('change', () => { validateTerms(); checkAllValid(); });

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    // Create summary
    const selectedGender = Array.from(genderRadios).find(radio => radio.checked).value;
    const summaryDiv = document.createElement('div');
    summaryDiv.id = 'summary';
    summaryDiv.innerHTML = `
        <h3>Registration Summary</h3>
        <p><strong>Name:</strong> ${firstName.value} ${lastName.value}</p>
        <p><strong>Email:</strong> ${email.value}</p>
        <p><strong>Country:</strong> ${country.value}</p>
        <p><strong>Gender:</strong> ${selectedGender}</p>
    `;
    // Replace existing summary or append
    const existingSummary = document.getElementById('summary');
    if (existingSummary) {
        existingSummary.replaceWith(summaryDiv);
    } else {
        form.appendChild(summaryDiv);
    }
});
