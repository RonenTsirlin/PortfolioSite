const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

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
            res.status(200).send({ success: true, message: 'Email sent successfully' });
        } else {
            res.status(response.status).send({ success: false, message: response.data.message });
        }
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
