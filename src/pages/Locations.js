
import React, { useEffect, useState } from 'react';
import "./Locations.css";

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [deliveryOrCarryout, setDeliveryOrCarryout] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [carryoutLocation, setCarryoutLocation] = useState('');

  useEffect(() => {
    // Fetch the locations data from an API or any data source
    // For this example, we'll use a static array
    const fetchedLocations = [
      {
        name: "Pizza Restaurant 1",
        address: "4034 Inspiration ave e, Fife, WA, 98424",
        lat: 40.712775,
        lng: -74.005973
      },
      {
        name: "Pizza Restaurant 2",
        address: "1202 336th ave s, Federal Way, WA, 98003",
        lat: 40.712488,
        lng: -73.935275
      },
      {
        name: "Pizza Restaurant 3",
        address: "789 Oak St, City, State, ZIP",
        lat: 40.732621,
        lng: -74.00594
      }
    ];

    setLocations(fetchedLocations);
  }, []);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDiIxYRz0I22cpR68yrO7t9qTgMElCGFxA&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Map initialization function
  window.initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 40.712775, lng: -74.005973 },
      zoom: 12
    });

    // Add markers and info windows for each location
    locations.forEach((location) => {
      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: '<h3>' + location.name + '</h3>' + '<p>' + location.address + '</p>'
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  };

  const handleDeliveryOrCarryout = (option) => {
    setDeliveryOrCarryout(option);
  };

  const handleDeliveryAddressChange = (event) => {
    setDeliveryAddress(event.target.value);
  };

  const handleCarryoutLocationChange = (event) => {
    setCarryoutLocation(event.target.value);
  };

  const handleContinue = () => {
    if (deliveryOrCarryout === 'delivery') {
      console.log('Delivery Address:', deliveryAddress);
    } else if (deliveryOrCarryout === 'carryout') {
      console.log('Carryout Location:', carryoutLocation);
    }
    // Add your logic for continuing to the next step
  };

  return (
    <div>
      <h1>Pizza Restaurant Locations</h1>
      <div className="delivery-carryout">
        <button
          className={deliveryOrCarryout === 'delivery' ? 'active' : ''}
          onClick={() => handleDeliveryOrCarryout('delivery')}
          style={{ fontFamily: 'Segoe UI', fontSize: '20px' }}
        >
          Delivery
        </button>
        <button
          className={deliveryOrCarryout === 'carryout' ? 'active' : ''}
          onClick={() => handleDeliveryOrCarryout('carryout')}
          style={{ fontFamily: 'Segoe UI', fontSize: '20px' }}
        >
          Carryout
        </button>
        <br></br>
      </div>
      {deliveryOrCarryout === 'delivery' && (
        <div>
          <label htmlFor="delivery-address" style={{ fontFamily: 'Segoe UI', fontSize: '18px' }}>
            Delivery Address:
          </label>
          <input
            type="text"
            id="delivery-address"
            value={deliveryAddress}
            onChange={handleDeliveryAddressChange}
            style={{ fontFamily: 'Segoe UI', fontSize: '16px' }}
          />
        </div>
      )}
      {deliveryOrCarryout === 'carryout' && (
        <div>
          <label htmlFor="carryout-location" style={{ fontFamily: 'Segoe UI', fontSize: '18px' }}>
            City/State or ZIP Code:
          </label>
          <input
            type="text"
            id="carryout-location"
            value={carryoutLocation}
            onChange={handleCarryoutLocationChange}
            style={{ fontFamily: 'Segoe UI', fontSize: '16px' }}
          />
        </div>
      )}
      <br></br>
      <button onClick={handleContinue} style={{ fontFamily: 'Segoe UI', fontSize: '20px' }}>
        Continue
      </button>
      <br></br>
      <br></br>
      <div id="map" className="map"></div>
    </div>
  );
}
  
  export default LocationsPage;