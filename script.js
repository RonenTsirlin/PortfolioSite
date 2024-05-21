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

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                alert('Email sent successfully');
                document.getElementById('contactForm').reset();
            } else {
                alert('Failed to send email: ' + data.message);
            }
        } else {
            const errorData = await response.json();
            alert('Failed to send email: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
});
