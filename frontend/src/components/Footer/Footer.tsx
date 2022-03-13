import React from "react";
import './Footer.scss';
import logo from '../../assets/images/github.png';

function Footer(props: any) {
  return (
    <footer className='footer'>

      <div className='gitBox'>
        <img src={logo} alt="Logo" /> GitHub profile accounts:
        <a href="https://github.com/lpona">Łukasz Ponachajba</a>
        <a href="https://github.com/5z3wczykj4kub">Kuba Szewczyk</a>
        <a href="https://github.com/dmnlgn">Damian Łaganowski</a>
        <a href="https://github.com/brt222">Bartłomiej Olek</a>
      </div>
    </footer>
  );

};

export default Footer;