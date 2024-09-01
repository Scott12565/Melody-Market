// server.js (Backend Server)

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

app.use(bodyParser.json());

app.post('/create-payment', async (req, res) => {
    try {
      const { amount, reference, userEmail } = req.body;
  
      // Set up the payload for the PayGate API
      const paymentData = {
        PAYGATE_ID: '10000100',
        REFERENCE: reference,
        AMOUNT: amount * 100, // Convert to cents
        CURRENCY: 'ZAR',
        RETURN_URL: 'http://localhost:3000/collection',
        TRANSACTION_DATE: new Date().toISOString(),
        LOCALE: 'en-za',
        COUNTRY: 'ZAF',
        EMAIL: userEmail,
      };
  
      // Send request to PayGate API
      const response = await axios.post('https://sandbox.payfast.co.za/eng/process', paymentData);
  
      // Return the response from PayGate API to the frontend
      res.json(response.data);
    } catch (error) {
      console.error('Error initiating PayGate payment:', error.message);
      res.status(500).send('Payment initiation failed');
    }
  });
  

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));