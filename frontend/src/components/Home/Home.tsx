import React from "react";
import Footer from "../Footer/Footer";
import "./Home.scss";
const Home = () => {
  return (
    <div>
      <div className="background">
        <h1>Everything Entertainment</h1>
        <div className="info">
          <div className="items">
            The premiere source of global
            <br /> entertainment metadata and box
            <br />
            office revenue
          </div>
          <div className="items">
            8+ milion titles
            <br /> 11+ cast and crew
            <br /> Global Box Office data
          </div>
          <div className="items">
            1 billion ratings from the word's
            <br /> largest entertainment fan
            <br /> community
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
