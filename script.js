document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const message = document.getElementById('message');

    registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        
        // Extract reCAPTCHA token from event detail
        const recaptchaToken = event.detail.event.token;

        if (!recaptchaToken) {
            message.textContent = 'Please complete the reCAPTCHA';
            return;
        }

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Verify reCAPTCHA token
        verifyRecaptcha(recaptchaToken)
            .then(response => {
                if (response.success) {
                    // Send registration data to server for verification
                    registerUser(username, password);
                } else {
                    message.textContent = 'reCAPTCHA verification failed';
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    function verifyRecaptcha(token) {
        // Send reCAPTCHA token to verification endpoint
        const apiKey = 'YOUR_API_KEY';
        const endpoint = `https://recaptchaenterprise.googleapis.com/v1/projects/sound-invention-421616/assessments?key=${apiKey}`;
        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                expectedAction: 'USER_ACTION',
                siteKey: '6LcRJMkpAAAAAJmPaO6fZfJNoiVfjUrJaEzqNLrn'
            })
        })
        .then(response => response.json());
    }

    function registerUser(username, password) {
        // Send registration data to the server
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => response.text())
        .then(data => {
            // Display server response
            message.textContent = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
