import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";


// Pepperoni, Supreme, Sausage, Hawaiian

const ContactPage = () => {
  return (
    <div className="container"> 
        <form className="contact-form">
            <input type="text" id="name" name="name" placeholder="Your full name..." required className="small-input"/>
        </form> 
    </div>
    
  );
}

export default ContactPage;