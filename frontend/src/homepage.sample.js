import React, { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("your-backend-endpoint-for-restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="Wrapper">
      <div className="circle">A</div>
      <div className="container">
        <div className="head">
          <div className="nothing"></div>
          <div className="title">
            <div className="smallTitle">Our restaurants</div>
            <div className="bigTitle">RESTAURANTS</div>
          </div>
        </div>

        <div className="first">
          {restaurants.map((restaurant) => (
            <div className="rest" key={restaurant.id}>
              <a href="">
                <img src={restaurant.image} alt="" />
              </a>
              <div className="desc">{restaurant.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
