import React from 'react';

const Hero = props => {
  return(
    <div>
      <img src={props.heroSprite} alt='Hero' height="50" width="30" />
    </div>
  )
}

export default Hero;
