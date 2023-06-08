import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import './CheckoutForm.css'
import CARD_ELEMENT_OPTIONS from './StripeOptions';

function CheckoutForm({ cartItems }) {
  const [user, setUser] = useState(null);
  const [setAddress] = useState('');
  const [setCreditCard] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [useAddressFromAccount, setUseAddressFromAccount] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleUseAddressFromAccountChange = (e) => {
    setUseAddressFromAccount(e.target.checked);
    if (e.target.checked && user) {
      const userRef = firebase.firestore().collection('users').doc(user.uid);
      const fetchUserData = async () => {
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const [street, city, state, zipCode] = userData.address.split(', ');
          setStreet(street);
          setCity(city);
          setState(state);
          setZipCode(zipCode);
        }
      };
      fetchUserData();
    } else {
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser(userAuth);

        const userRef = firebase.firestore().collection('users').doc(userAuth.uid);
        const fetchUserData = async () => {
          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setAddress(userData.address || '');
            setCreditCard(userData.creditCard || '');
          }
        };
        fetchUserData();
      } else {
        setUser(null);
      }
    });

    let initialTotal = cartItems.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setTotalPrice(initialTotal);

    return () => {
      unsubscribe();
    };
  }, [cartItems, setAddress, setCreditCard]);

  const handleDeliveryOptionChange = (e) => {
    if (e.target.value === 'delivery') {
      setDelivery(true);
      setTotalPrice(totalPrice + 999);
    } else {
      setDelivery(false);
      setTotalPrice(totalPrice - 999);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const createPaymentIntent = firebase.functions().httpsCallable('createPaymentIntent');
    const paymentIntentData = {
      amount: Math.round(totalPrice),
    };

    try {
      const { data: clientSecret } = await createPaymentIntent(paymentIntentData);
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            address: {
              line1: street,
              city: city,
              state: state,
              postal_code: zipCode,
            },
          },
        },
      });

      if (error) {
        console.error('[error]', error);
      } else {
        console.log('Success!');
        // ... Save order data to the database and clear the cart
      }
    } catch (error) {
      console.error('[createPaymentIntent error]', error);
    }
  };

  return (
    <>
      <div className="order-confirmation-container">
        <div className="order-confirmation-header">
          <h2>Order Confirmation</h2>
          <span className="total-price">
            Total: ${(totalPrice / 100).toFixed(2)}
          </span>
          <div className="delivery-options">
            <label>
              <input
                type="radio"
                value="delivery"
                checked={delivery}
                onChange={handleDeliveryOptionChange}
              />
              Delivery
            </label>
            <label>
              <input
                type="radio"
                value="pickup"
                checked={!delivery}
                onChange={handleDeliveryOptionChange}
              />
              Carryout
            </label>
          </div>
        </div>

        <div className="confirmation-info-container">
          <div className="quadrants-container">
            <div className="left-quadrant">
              <div className="info-section">
                <h3>Your Information</h3>
                <hr className="dotted-divider" />
                <p>{user?.displayName}</p>
                <p>{user?.email}</p>
              </div>
              <div className="info-section">
                <h3>Delivery Address</h3>
                <hr className="dotted-divider" />
                {delivery && (
                  <>
                    <div className="address-option">
                      <label>
                        <input
                          type="checkbox"
                          checked={useAddressFromAccount}
                          onChange={handleUseAddressFromAccountChange}
                        />
                        Use address from account
                      </label>
                    </div>
                    <table className="address-table">
                      <tbody>
                        <tr>
                          <td><label htmlFor="street">Street:</label></td>
                          <td>
                            <input
                              type="text"
                              id="street"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="city">City:</label></td>
                          <td>
                            <input
                              type="text"
                              id="city"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="state">State:</label></td>
                          <td>
                            <input
                              type="text"
                              id="state"
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td><label htmlFor="zipCode">Zip Code:</label></td>
                          <td>
                            <input
                              type="text"
                              id="zipCode"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
            <div className="right-quadrant">
              <div className="info-section">
                <h3>Cart</h3>
                <hr className="dotted-divider" />
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <span>{item.name}</span>
                    <span>${(item.price / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="info-section">
                <h3>Payment</h3>
                <hr className="dotted-divider" />
                <form onSubmit={handleSubmit}>
                  <table className="card-table">
                    <tbody>
                      <tr>
                        <td><label htmlFor="card">Card Number:</label></td>
                        <td><CardNumberElement className="card-number" options={CARD_ELEMENT_OPTIONS} /></td>
                      </tr>
                      <tr>
                        <td><label htmlFor="exp">Expiration Date:</label></td>
                        <td><CardExpiryElement options={CARD_ELEMENT_OPTIONS} /></td>
                      </tr>
                      <tr>
                        <td><label htmlFor="cvc">CVC:</label></td>
                        <td><CardCvcElement options={CARD_ELEMENT_OPTIONS} /></td>
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit">Confirm Order</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutForm;
