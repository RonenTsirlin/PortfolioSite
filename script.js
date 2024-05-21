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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send email');
        }

        const data = await response.json();
        console.log('Response data:', data);

        alert('Email sent successfully');
        document.getElementById('contactForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
});
