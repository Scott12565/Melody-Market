const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
// PayGate sandbox configuration
const merchantId = '10011072130';  // PayGate sandbox merchant ID
const merchantKey = '46f0cd694581a';  // PayGate sandbox merchant key
const paygateInitiateUrl = 'https://secure.paygate.co.za/payweb3/initiate.trans';  // Sandbox URL

// Route to handle payment initiation
app.post('/pay', async (req, res) => {
    const { amount, reference, returnUrl, notifyUrl, email } = req.body;

    // Validate input
    if (!amount || !reference || !returnUrl || !notifyUrl || !email) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Format the payload with necessary details
    const payload = {
        PAYGATE_ID: merchantId,
        REFERENCE: reference,
        AMOUNT: amount,  // Amount is in cents (e.g., R25 = 2500)
        CURRENCY: 'ZAR',  // South African Rand
        RETURN_URL: returnUrl,  // Where to redirect after payment
        TRANSACTION_DATE: new Date().toISOString(),
        LOCALE: 'en-za',
        COUNTRY: 'ZAF',
        EMAIL: email,
        NOTIFY_URL: notifyUrl,
        CHECKSUM: '',  // Checksum to validate the request
    };

    // Generate a checksum for the request (ensures the request's security)
    const checksumString = `${payload.PAYGATE_ID}|${payload.REFERENCE}|${payload.AMOUNT}|${payload.CURRENCY}|${payload.RETURN_URL}|${payload.TRANSACTION_DATE}|${merchantKey}`;
    const checksum = crypto.createHash('md5').update(checksumString).digest('hex');
    payload.CHECKSUM = checksum;

    try {
        // Send payment initiation request to PayGate
        const response = await axios.post(paygateInitiateUrl, payload);
        const { PAY_REQUEST_ID } = response.data;  // Extract PayGate's payment request ID

        // Respond with the PayGate redirect URL
        res.json({
            success: true,
            payRequestId: PAY_REQUEST_ID,
            redirectUrl: `https://secure.paygate.co.za/payweb3/process.trans?PAY_REQUEST_ID=${PAY_REQUEST_ID}`,  // PayGate sandbox payment page
        });
    } catch (error) {
        console.error('Payment initiation error:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, message: 'Error initiating payment' });
    }
});

// Route to handle return from PayGate after payment
app.get('/return', (req, res) => {
    const { PAY_REQUEST_ID, TRANSACTION_STATUS, REFERENCE } = req.query;

    // Check the transaction status (1 means successful)
    if (TRANSACTION_STATUS === '1') {
        res.send(`Payment successful for reference: ${REFERENCE}`);
    } else {
        res.send('Payment failed or cancelled.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
