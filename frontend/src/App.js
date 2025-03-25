import React, { useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';

const products = [
    { id: 1, name: 'Product 1', price: 50, img: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 30, img: 'product2.jpg' },
    { id: 3, name: 'Product 3', price: 100, img: 'product3.jpg' },
];

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const checkout = () => {
    // Make API request to create order and get the payment URL
    fetch('https://super-duper-carnival-beta.vercel.app/create-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_id: 'order123',
            order_amount: 50.00,
            customer_email: 'customer@example.com',
            customer_phone: '1234567890',
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            window.location.href = data.payment_url; // Redirect to Cashfree payment page
        } else {
            alert('Payment creation failed.');
        }
    })
    .catch((error) => console.error('Error:', error));
};

    return (
        <div className="App">
            <header>
                <h1>My eCommerce Shop</h1>
                <div className="cart">
                    Cart ({cart.length} items)
                </div>
            </header>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
            </div>
            {cart.length > 0 && (
                <div className="checkout">
                    <button onClick={checkout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default App;
