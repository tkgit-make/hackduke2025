//import React from "react";
import Card from "./Card";
import "./Discover.css";

const Discover = () => {
  const cards = Array(6).fill({
    company: "Cubiko",
    price: "$100",
    raised: "$20K",
    goal: "$50K",
    image: "https://via.placeholder.com/150", // Replace with actual image path
  });

  return (
    <div className="discover-page">
      <div className="discover-content">
        <h2 style = {{color: '#00F6D5', textAlign: 'left'}}className="section-title">Near_Funded</h2>
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
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
