import React from "react";
import "./OurStory.css";
import pizzaPicture from "../images/pizza_time.png"

function OurStoryPage() {
  return (
    <div className="story-container">
      <img class="picture-ourStory" alt="guyHoldingPizza" src= {pizzaPicture}/>
        <h1>Our Story!</h1>
                <p>
                At Pizza-Hub, we believe that great pizza brings people together. We are a passionate team of pizza enthusiasts dedicated to serving delicious, handcrafted pizzas that satisfy your cravings and leave you wanting more. With our commitment to quality ingredients, exceptional flavors, and outstanding customer service, we aim to create an unforgettable dining experience for every customer who walks through our doors or orders from our website. 
                </p>
                <p>
                Our journey began with a simple vision: to create the perfect pizza. We spent countless hours experimenting with different dough recipes, selecting the freshest toppings, and perfecting our signature sauces. Through dedication and a relentless pursuit of excellence, we crafted a menu that showcases a variety of mouthwatering pizzas to cater to every taste bud.
                </p>
                <p>
                Quality is our top priority. We source only the finest ingredients, ensuring that each pizza is made with premium, locally sourced produce, succulent meats, and a blend of high-quality cheeses. Our skilled chefs hand-toss the dough, layering it with generous portions of toppings and carefully baking it to perfection in our traditional stone ovens. The result is a pizza that is not only visually appealing but also bursting with flavors that will tantalize your senses.
                </p>
                <p>
                Pizza-Hub is more than just a restaurant; it's a place where friends and families can gather to share laughter, create memories, and enjoy delicious food. Our warm and inviting ambiance creates a welcoming atmosphere, whether you choose to dine in or opt for takeout or delivery. Our friendly staff is always ready to assist you, ensuring that your experience with us is nothing short of exceptional.
                </p>
                <p>
                At Pizza-Hub, we don't just settle for being good; we constantly strive to be better. We value your feedback and are continuously exploring new flavors and innovative combinations to surprise and delight your taste buds. We take pride in being an integral part of the local community and actively support local charities and events.
                </p>
                <p>
                So, whether you're looking for a casual dinner with friends, a quick bite on your lunch break, or a memorable pizza party, come and experience the culinary delight that is Pizza-Hub. Join us as we redefine the pizza experience, one slice at a time.
                </p>
                <p>
                Indulge in the magic of pizza perfection at Pizza-Hub today!
                </p>
    </div>
  );
}

export default OurStoryPage;