
import React, { useState } from 'react';
import './Slider.scss';
import ImageComp1 from './ImageComp1';
import ImageComp2 from './ImageComp2';
import ImageComp3 from './ImageComp3';



import i1 from '../../assets/images/1.jpg';
import i2 from '../../assets/images/2.jpg';
import i3 from '../../assets/images/3.jpg';

const Slider = () => {

  let sliderArr = [<ImageComp1 />, <ImageComp2 />, <ImageComp3 />,];
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  }
  const goRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  }

  return (
    <div className='slider'>
      {sliderArr.map((item, index) => {
        return (
          <div key={index} className='slide' style={{ transform: `translateX(${x}%)` }}>
            {item}
          </div>
        );
      })}
      <button id='goLeft' onClick={goLeft}>&#60;</button>
      <button id='goRight' onClick={goRight}>&#62;</button>

    </div>
  );
}

export default Slider;