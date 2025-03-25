const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Replace these with your actual Cashfree API credentials
const cashfreeAPIKey = 'YOUR_CASHFREE_API_KEY';
const cashfreeSecretKey = 'YOUR_CASHFREE_SECRET_KEY';

app.post('/create-order', async (req, res) => {
    const { order_id, order_amount, customer_email, customer_phone } = req.body;

    const orderData = {
        order_id,
        order_amount,
        customer_email,
        customer_phone,
    };

    try {
        const response = await axios.post('https://api.cashfree.com/api/v1/order', orderData, {
            headers: {
                'x-api-key': cashfreeAPIKey,
                'Content-Type': 'application/json',
            },
        });

        if (response.data.status === 'success') {
            res.json({
                success: true,
                payment_url: response.data.payment_url, // URL to redirect user to payment page
            });
        } else {
            res.json({ success: false, message: 'Failed to create order' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
