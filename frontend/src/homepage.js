import React from "react";
import "./homepage.css";

function Home() {
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
          <div className="rest">
            <a href="">
              <img src="pictures\res 2.jpg" alt="" />
            </a>
            <div className="desc">Burger Palace</div>
          </div>
          <div className="rest">
            <a href="">
              <img src="pictures\res4.jpg" alt="" />
            </a>
            <div className="desc">Trantoria Pizzeria</div>
          </div>
          <div className="rest">
            <a href="">
              <img src="pictures\res7.jpg" alt="" />
            </a>
            <div className="desc">StarBucks Coffee</div>
          </div>
        </div>
        <div className="first">
          <div className="rest">
            <a href="">
              <img src="pictures\res6.jpg" alt="" />
            </a>
            <div className="desc">Court Center</div>
          </div>
          <div className="rest">
            <a href="">
              <img src="pictures\res5.jpg" alt="" />
            </a>
            <div className="desc">La Poma</div>
          </div>
          <div className="rest">
            <a href="">
              <img src="pictures\res4.jpg" alt="" />
            </a>
            <div className="desc">Trantoria Pizzeria</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
