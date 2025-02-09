
class FormValidator {
    static PATTERNS = {
        fullName: /^([a-zA-Z]{3,}\s)*[a-zA-Z]{3,}$/,
        email: /^[a-zA-Z0-9]+@[a-z]+\.(com|net|edu|org)\.eg$/
    };

    static validateFullName(fullName) {
        return FormValidator.PATTERNS.fullName.test(fullName);
    }

    static validateEmail(email) {
        return FormValidator.PATTERNS.email.test(email);
    }

    static validateAge(age) {
        return parseInt(age) >= 18;
    }
}

document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    
    
    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const age = formData.get('age');


    if (!FormValidator.validateFullName(fullName)) {
        alert('Invalid full name');
        e.preventDefault();       
    }
    else if (!FormValidator.validateEmail(email)) {
        alert('Invalid email');
        e.preventDefault();
    }
    else if (!FormValidator.validateAge(age)) {
        alert('You must be 18 years or older');
        e.preventDefault();
    }
    else {
        console.log(`Full Name: ${fullName} | Email: ${email} | Age: ${age}`);
        alert('Form submitted successfully');
    }
});
