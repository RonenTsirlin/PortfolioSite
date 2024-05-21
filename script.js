document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
        const response = await fetch('https://portfoliosite-omhc.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        // Log the entire response for debugging
        console.log('Response:', response);

        const data = await response.json();

        // Log the parsed data for debugging
        console.log('Response data:', data);

        if (response.ok) {
            alert('Email sent successfully');
            document.getElementById('contactForm').reset();
        } else {
            throw new Error(data.message || 'Failed to send email');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
});
