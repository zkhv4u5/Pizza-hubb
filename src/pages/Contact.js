import instagramIcon from '..//images/Instagram.png';
import facebookIcon from '..//images/Facebook.jpg';
import twitterIcon from '..//images/Twitter.png';
import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";


// Pepperoni, Supreme, Sausage, Hawaiian

const ContactPage = () => {
  return (
    <div className="contact-container"> 
        <form className="contact-form">
            <input type="text" id="name" name="name" placeholder="Your full name" required className="small-input"/>
            <input type="email" id="email" name="name" placeholder="Your email address" required className="small-input"/>
            <textarea id="message" name="message" placeholder="Your message" required className="large-input"></textarea>

            <button type="submit">Send</button>
        </form> 
        <div className="contact-social-container">
          <img src={instagramIcon} alt="Instagram"/>
          <img src={facebookIcon} alt="Facebook"/>
          <img src={twitterIcon} alt="Twitter"/>
        </div>
    </div>
   
    
  );
}

export default ContactPage;