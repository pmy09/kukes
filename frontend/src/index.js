import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Signinup from "./signinup";
import Landingpage from "./landingpage";
import Home from "./homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/LandingPage" element={<Landingpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Signinup" element={<Signinup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
