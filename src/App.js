import React from 'react';
import styles from './SignIn.module.css';
import { BrowserRouter, Form, Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from './components/Navigation';
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import ContactUsPage from './pages/Contact';
import LocationsPage from './pages/Locations';
import OrderOnlinePage from './pages/OrderOnline';
import OurStoryPage from './pages/OurStory';
import SignInPage from './pages/SignIn';
import CheckoutPage from './pages/Checkout';
import Manage from './pages/Manage'
import basename from './services/basename';
import CartProvider from './components/CartProvider';
import './App.css';
import {ClerkProvider,SignedIn,SignedOut,RedirectToSignIn,SignIn,SignUp} from "@clerk/clerk-react";
import { Grid } from '@mui/material';
// import dotenv from "dotenv";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {

  throw new Error("Missing Publishable Key")

}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <CartProvider>
        <div className="App">
          <NavigationBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in"         appearance={{
                elements: {
                  formButtonPrimary: styles.primaryColor,
                  rootBox: styles.margin,
                  Card: styles.card
                }
                }}/>} />
              <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />}/>
              <Route path="/sign-out" element={<SignUp routing="path" path="/sign-out" />}/>
              <Route path="/admin" element={<> <SignedIn> <Manage /></SignedIn> <SignedOut> <RedirectToSignIn /></SignedOut></>}/>
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/menu"element={<MenuPage/>}/>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-online" element={<OrderOnlinePage />} />
              <Route path="/locations" element={<LocationsPage />} />   
            </Routes>
        </div>
       </CartProvider>
    </ClerkProvider>
  );

}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
