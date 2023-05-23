import React, { useEffect, useState } from 'react';
import "./OrderOnline.css";

const OrderOnlinePage = () => {
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");

  const handleDeliveryOption = (option) => {
    setDeliveryOption(option);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmitOrder = () => {
    // Handle submitting the order with the selected delivery option and information
    console.log("Delivery Option:", deliveryOption);
    console.log("Address:", address);
    console.log("Zip Code:", zipCode);
    console.log("City:", city);
    // Add your logic to submit the order
  };

  return (
    <div className='main'>
      <h1>HOW DO YOU WANT YOUR ORDER TODAY?</h1>

      <h2>STORE LOCATOR</h2>
      <div>
        <label>
          <input
            type="radio"
            name="deliveryOption"
            value="delivery"
            checked={deliveryOption === "delivery"}
            onChange={() => handleDeliveryOption("delivery")}
          />
          Delivery
        </label>
        <label>
          <input
            type="radio"
            name="deliveryOption"
            value="carryout"
            checked={deliveryOption === "carryout"}
            onChange={() => handleDeliveryOption("carryout")}
          />
          Carryout
        </label>
      </div>

      {deliveryOption === "delivery" && (
        <div>
          <h2>Delivery Address:</h2>
          <input type="text" value={address} onChange={handleAddressChange} placeholder="Enter your address" />
        </div>
      )}

      {deliveryOption === "carryout" && (
        <div>
          <h2>Carryout Information:</h2>
          <input type="text" value={zipCode} onChange={handleZipCodeChange} placeholder="Enter your zip code" /> or 
          <input type="text" value={city} onChange={handleCityChange} placeholder="Enter your city" />
        </div>
      )}
      <br></br>
      <button onClick={handleSubmitOrder} style={{ fontFamily: 'Segoe UI', fontSize: '20px' }}>Place Order</button>
    </div>
  );
};

export default OrderOnlinePage;