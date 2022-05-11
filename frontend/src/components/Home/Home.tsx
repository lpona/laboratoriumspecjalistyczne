import React from "react";
import Footer from "../Footer/Footer";
import "./ImageComp1.scss";
import "./ImageComp2.scss";
import "./ImageComp3.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

import Slider from './Slider';



const Home = () => {
  return (
    <div>

      <div>
        <Slider />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
