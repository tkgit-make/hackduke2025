//import React from "react";
import Card from "./Card";
import "./Discover.css";

const Discover = () => {
  const cards = Array(12).fill({
    company: "Cubiko",
    price: "$100",
    raised: "$10K",
    goal: "$50K",
    image: "Cubikopic.png", // Replace with actual image path
  });

  return (
    <div className="discover-page">
      <div className="discover-content">
        <h2 style = {{color: '#00e0b6', textAlign: 'left'}}className="section-title">Near_Funded</h2>
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              company={card.company}
              price={card.price}
              raised={card.raised}
              goal={card.goal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
