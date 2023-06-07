import React, { useContext } from 'react';
import { CartContext } from '../services/CartContext';
import { Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/Checkout';

function CheckoutPage() {
    const { cartItems } = useContext(CartContext);
    const stripePromise = loadStripe('pk_test_51N2KiYDpQVHsLbUuNw2' +
    'QJboOx9nR4KDyo2VubkYlucIVUYDXXoOGMLk4JnX9YpTQJlQO1GcmLkb8nTecQYQxlP7S005ytlvPSm');

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm cartItems={cartItems} />
            </Elements>
        </div>
    );
}

export default CheckoutPage;