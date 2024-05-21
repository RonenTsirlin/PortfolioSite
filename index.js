const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS with specific origin and allow credentials
app.use(cors({
    origin: 'https://ronentsirlin.github.io',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const response = await axios.post('https://api.web3forms.com/submit', {
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message
        });

        if (response.status === 200) {
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } else {
            res.status(response.status).json({ success: false, message: response.data.message });
        }
    } catch (error) {
        console.error(error); // Log the error to diagnose the issue
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
