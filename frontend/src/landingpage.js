import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Landingpage() {
  return (
    <div className="Panels">
      <header className="leftSide">
        <h1 className="leader-text">ARE YOU HUNGRY ?</h1>
        <h3 className="subleader-text">
          Ready to have the best meal of your time! Give us a trial. With our
          finest restaurants, you sure would
        </h3>

        <div className="buttons">
          <Link to="/signinup">
            <button className="logbutton">LOG IN</button>
          </Link>
          <Link to="/signinup">
            <button className="signbutton">SIGN UP</button>
          </Link>
        </div>
      </header>

      <div className="decorator-img">
        <img src="pictures/fff.png" alt="Spagherri" />
      </div>

      <div className="rightSide">
        <div className="line1">
          <div className="text">User friendly</div>
          <div className="circle">1</div>
        </div>
        <div className="line1">
          <div className="text">See all your favourite at once</div>
          <div className="circle">2</div>
        </div>
        <div className="line1">
          <div className="text">Food at your door step</div>
          <div className="circle">3</div>
        </div>
        <div className="line1">
          <div className="text">SignUp now</div>
          <div className="circle">4</div>
        </div>
      </div>
    </div>
  );
}

export default Landingpage;
