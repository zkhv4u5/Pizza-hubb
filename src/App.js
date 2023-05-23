import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navigation';
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import ContactUsPage from './pages/Contact';
import LocationsPage from './pages/Locations';
import OrderOnlinePage from './pages/OrderOnline';
import OurStoryPage from './pages/OurStory';
import SignInPage from './pages/SignIn';
import CheckoutPage from './pages/Checkout';
import basename from './services/basename';
import {CartProvider} from './services/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={basename}>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu"element={<MenuPage/>}/>
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-online" element={<OrderOnlinePage />} />
            <Route path="/locations" element={<LocationsPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
